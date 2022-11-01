
const ContractVariables = ({contractVars}) => {

  return (
      <div className='text-base text-neutral-200 leading-relaxed mt-7'>
        {contractVars && contractVars.map((cvar) =>
          <div key={cvar.name} className='flex flex-col justify-start items-start pl-6'>
            <div>{cvar.name}</div>
            <div className='text-xs text-neutral-300 pb-2'>{cvar.value}</div>
          </div>
        )}
      </div>
  )
}

export default ContractVariables
