import {createContext, useState} from 'react';

export const ContractContext = createContext({});

export const ContractProvider = ({children}) => {
  const [functions, functionsSet] = useState([])
  const [contractVars, contractVarsSet] = useState(null)
  const [displayVars, displayVarsSet] = useState(false)
  const [balanceList, balanceListSet] = useState(null)
  const [displayBalance, displayBalanceSet] = useState(0)
  const [hasData, hasDataSet] = useState(true);
  const [scid, scidSet] = useState(true);

  const context = {
    functions, functionsSet,
    contractVars, contractVarsSet,
    displayVars, displayVarsSet,
    balanceList, balanceListSet,
    displayBalance, displayBalanceSet,
    hasData, hasDataSet,
    scid, scidSet
  }

  return (
    <ContractContext.Provider value={context}>{children}</ContractContext.Provider>
  )

}