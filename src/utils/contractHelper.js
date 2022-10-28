

export class ContractUtils {
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
        compactedSegments.push(modifiedSegment);
      }
      return compactedSegments;
    }, []).join('End Function\n\n');

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

  // TODO Need to see more data to make sure this is correct as there is a 'balances' data structure too (for atomic units?)
  static getBalances = (balance) => {
    return parseFloat(balance);
  }

  static getVariables = (stringKeys) => {
    return Object.keys(stringKeys)
      .map(key => new Object({'name': key, 'value': stringKeys[key]}))
  }
}