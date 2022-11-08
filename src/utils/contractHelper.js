import {DeroDecimalPlaces, ZeroAddress} from '/src/enums/DeroContractConstants.js';

const varTypes = {
  string: 'S',
  number: 'U',
  String: 'S',
  Uint64: 'U'
}

export class ContractUtils {
  static packageContractPayload = (formData, name, code, args) => {
    let data = [];
    let currentDataSignature = '';
    let scRpcData = [];
    let transferData = [];
    let feeData = 0;
    // Move data into array I know how to access :) & create dependency string for useCallback -- TODO Modify to useRef??
    for (let [key, value] of formData.entries()) {
      currentDataSignature += value.replace(/\s+/g, '')
      data.push({'key': key, 'value': value})
    }

    // Add entry point
    scRpcData.push({name: 'entrypoint', datatype:'S', value: name})

    // Add any arg data to scPrcData & create any transferData objects for monetary fields
    data.forEach((element) =>  {
      switch (element.key) {
        case args.find(arg => arg.name === element.key)?.name:
          const currentArgType = varTypes[args.find(arg => arg.name === element.key).type];
          const dataValue = currentArgType === varTypes.number ? element.value.match(/\./g) ? parseFloat(element.value) : parseInt(element.value) : element.value
          scRpcData.push({name: element.key, datatype: currentArgType, value: dataValue})
          break;
        case 'deroAmount':
          if (element.value) {
            const wallet = data.find(item => item.key === 'destination')
            transferData.push({destination: wallet.value, burn: parseInt(element.value)})
          }
          break;
        case 'tokenAmount':
          if (element.value) {
            const assetScid = data.find(item => item.key === 'tokenScid')
            transferData.push({scid: assetScid.value, burn: parseInt(element.value)})
          }
          break;
        case 'fee':
          feeData = parseInt(element.value)
          break;
        default:
          if (element.key !== 'tokenScid' && element.key !== 'destination') {
            console.warn('ALERT - contract execution data not accounted for', element)
          }
          break;
      }
    })

    console.log('TransferDATA', transferData);

    return {scRpcData, transferData, feeData, currentDataSignature}
  }

  static getFunctionData = (codeBlock) => {
    // Regex's to extract elements of the contract code
    const functionSearch = /Function(.{1,}\r*\n){1,}End Function/gm
    const argSearch = /\(.*\)/
    const nameSearch = /\w+/g

    // Jump through some hoops to get rid of blank lines within each function
    const tempcode = codeBlock.split('End Function');
    let code = tempcode.reduce((compactedSegments, segment) => {
      let modifiedSegment = segment.split(/[\r\n]+/).join('\n');
      if (modifiedSegment.length) {
        compactedSegments.push(modifiedSegment.trim());
      }
      return compactedSegments;
    }, []).join('\nEnd Function\n\n').concat('\nEnd Function\n');

    // Create an array of the contract's functions
    let functionArray = code.match(functionSearch).map(item => new Object({"code": item}))

    // Extract elements from each function
    for (let f = 0; f < functionArray.length; f++) {
      functionArray[f].name = functionArray[f].code.match(nameSearch)[1]
      functionArray[f].args = (functionArray[f].code.match(argSearch)[0]).replace(/[()]/g,'').split(',').reduce((functionArgs, arg) => {
        const argItem = arg.trim().split(/\s+/);
        if (argItem[0]) {
          return [...functionArgs, {name: argItem[0], type: argItem[1]}]
        }
      }, [])
    }

    return functionArray;
  }

  static getBalances = (balances) => {
    let formattedBalances = [];
    const values = Object.values(balances);
    Object.keys(balances).forEach((balance, index) => {
      formattedBalances.push(new Object({'wallet': balance, 'value': values[index]}))
    });

    return formattedBalances
  }

  static getVariables = (stringKeys) => {
    return Object.keys(stringKeys)
      .map(key => new Object({'name': key, 'value': stringKeys[key]}))
  }

  static atomicUnitsToDero = (atomicUnits) => {
    const factor = Math.pow(10, DeroDecimalPlaces.DERO_DECIMAL_PLACES);
    return atomicUnits / factor
  }

  static getFunctionMonetaryInputs = () => {
    return [
      {
        name: 'destination',
        type: 'String',
        toolTip: 'Random burn address'
      },
      {
        name: 'deroAmount',
        type: 'Uint64',
        toolTip: 'Amount of Dero to transfer'
      },
      {
        name: 'tokenAmount',
        type: 'Uint64',
        toolTip: 'Token amount (not Dero) to transfer'
      },
      {
        name: 'tokenScid',
        type: 'String',
        toolTip: 'SCID of token contract if you are populating the token field'
      },
      {
        name: 'fee',
        type: 'Uint64',
        toolTip: 'Fee to cover writing to network'
      }
    ]
  }
}