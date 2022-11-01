import {ContractUtils} from '/src/utils/contractHelper.js';

const ContractBalances = ({balances}) => {

  return (
    <div className='text-base text-neutral-200 leading-relaxed mt-1'>
      <div className='flex flex-col justify-start items-start pl-6'>
        <div className='flex flex-row justify-start pb-1 w-full'>
          <div className='pr-4 basis-2/12'>Balance {/*<span className='text-sm text-neutral-300'>Ð</span>*/}</div>
          <div>Wallet</div>
        </div>
        {balances && balances.map((bal, index) =>
          <div key={bal.wallet} className='flex flex-row justify-start pb-1 w-full'>
            <div className='pr-4 basis-2/12'>
              {`${ContractUtils.atomicUnitsToDero(bal.value)}`}
            </div>
            <div>{bal.wallet}</div>
          </div>
        )}
      </div>
    </div>
  )
}

export default ContractBalances