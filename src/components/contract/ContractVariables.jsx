import SimpleTable from '/src/components/common/simpleTable.jsx';

const ContractVariables = ({contractVars}) => {

  return (
      <div className='text-base text-neutral-200 leading-relaxed mt-7'>
        <SimpleTable headers={['Name', 'Value']} data={contractVars} />
      </div>
  )
}

export default ContractVariables
