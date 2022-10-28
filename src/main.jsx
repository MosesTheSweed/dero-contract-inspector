import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import {BridgeProvider} from '/src/components/providers/bridgeProvider.jsx';
import {ContractProvider} from '/src/components/providers/contractProvider.jsx';

export const Providers = ({children}) => {
  return (
    <BridgeProvider>
      <ContractProvider>
        {children}
      </ContractProvider>
    </BridgeProvider>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
