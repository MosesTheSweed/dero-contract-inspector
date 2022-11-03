import {ContractUtils} from '/src/utils/contractHelper.js';
import {CurrencySymbol, ZeroAddress} from '/src/enums/DeroContractConstants.js';
import {useGetCurrencySymbol} from '/src/hooks/useGetCurrencySymbol.js';
import {useContext, useEffect} from 'react';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';

const ContractBalances = ({balances}) => {
  const {balanceList, cSymbols} = useContext(ContractContext)
  useGetCurrencySymbol(balanceList)

  useEffect(() => {
    // Need this to make data available below to render
  }, [cSymbols])

  return (
    <div className='text-base text-neutral-200 leading-relaxed mt-1'>
      <div className='flex flex-col justify-start items-start pl-6'>
        <div className='flex flex-row justify-start pb-1 w-full'>
          <div className='pr-4 basis-2/12'>Balance {/*<span className='text-sm text-neutral-300'>Ð</span>*/}</div>
          <div>Asset Contract SCID</div>
        </div>
        {balances && balances.map((bal, index) =>
          <div key={bal.wallet} className='flex flex-row justify-start pb-1 w-full'>
            <div className='pr-4 basis-2/12'>
              {bal.wallet === ZeroAddress.ZERO_ADDRESS ? `${ContractUtils.atomicUnitsToDero(bal.value)} ${CurrencySymbol.DERO}` : bal.value} {cSymbols && cSymbols.find((item) => item.wallet === bal.wallet)?.symbol}
            </div>
            <div>{bal.wallet}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContractBalances