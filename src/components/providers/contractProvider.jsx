import {createContext, useState} from 'react';

export const ContractContext = createContext({});

export const ContractProvider = ({children}) => {
  const [functions, functionsSet] = useState([])
  const [contractVars, contractVarsSet] = useState(null)
  const [displayVars, displayVarsSet] = useState(false)
  const [balanceList, balanceListSet] = useState(null)
  const [hasData, hasDataSet] = useState(false);
  const [scid, scidSet] = useState(true);

  const context = {
    functions, functionsSet,
    contractVars, contractVarsSet,
    displayVars, displayVarsSet,
    balanceList, balanceListSet,
    hasData, hasDataSet,
    scid, scidSet
  }

  return (
    <ContractContext.Provider value={context}>{children}</ContractContext.Provider>
  )

}