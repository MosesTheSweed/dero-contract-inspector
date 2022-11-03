import {useContext, useRef} from 'react';
import {BridgeContext} from '/src/components/providers/bridgeProvider.jsx';
import to from 'await-to-js';
import {ZeroAddress} from '/src/enums/DeroContractConstants.js';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';

export const useGetCurrencySymbol = (balances) => {
  const {deroBridgeApi} = useContext(BridgeContext);
  const {cSymbolsSet} = useContext(ContractContext)

  // TODO need useRef to prevent inf loop - need to come back to see if a better way
  const haveRef = useRef(false)
  const result = getCurrencySymbol(balances, deroBridgeApi)
  Promise.all(result).then(res => {
    if (!haveRef.current) {
      cSymbolsSet(res)
      haveRef.current = true
    }
  })
}

const getCurrencySymbol = (balances, deroBridgeApi) => {
  const symbolList = []
  for (const balance of balances) {
    if (balance.wallet !== ZeroAddress.ZERO_ADDRESS) {
      symbolList.push(getBalanceContract(balance, deroBridgeApi))
    }
  }

  return symbolList
}

const getBalanceContract = async (balance, deroBridgeApi) => {
  const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
    scid: balance.wallet,
    code: true,
    variables: false
  }))

  if (err || (res && res.data.result.status !== 'OK') || (res && !res.data.result.code)) {
    console.warn('Got an Error in getBalanceContract from bridge call', err)
  } else {
    let symbol = ''
    if (res && res.data && res.data.result) {
      let functionContent =  res?.data?.result?.code.replace(/\s+/g, '').split(/\"symbol\",\"/)
      if (functionContent.length === 2) {
        symbol = functionContent[1].split(/\"/)[0]
      }
    }
    return {wallet: balance.wallet, symbol: symbol}
  }
}