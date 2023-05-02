import React from 'react'
import ReactDOM from 'react-dom/client'
import {App} from './App'
import './index.css'
import {BridgeProvider} from '/src/components/providers/bridgeProvider.jsx';
import {ContractProvider} from '/src/components/providers/contractProvider.jsx';
import {QueryClient, QueryClientProvider} from 'react-query';
import {ReactQueryDevtools} from "react-query/devtools";

export const Providers = ({children}) => {
  const queryClient = new QueryClient()

  return (
    <BridgeProvider>
      <ContractProvider>
        <QueryClientProvider client={queryClient}>
          {children}
          <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
      </ContractProvider>
    </BridgeProvider>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Providers>
      <App />
    </Providers>
  </React.StrictMode>
)
