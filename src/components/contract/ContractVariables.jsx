import SimpleTable from '/src/components/common/SimpleTable.jsx';
import {useDownload} from '/src/hooks/useDownload.js';

const ContractVariables = ({contractVars}) => {
  const {exportToJson, exportToCsv} = useDownload()

  const handleJsonExport = (event) => {
    event.preventDefault();
    exportToJson(contractVars);
  }

  const handleCsvExport = (event) => {
    event.preventDefault();
    exportToCsv(contractVars);
  }

  return (
      <div className='text-base text-neutral-200 leading-relaxed mt-7'>
        <div className='flex flex-row justify-center pb-4'>
          <button type='button' onClick={handleCsvExport} className='className="inline-flex items-center py-2.5 px-4 pr-6 ml-2 text-xs font-medium text-purple-800 bg-cyan-400 rounded-lg border border-blue-700 hover:bg-cyan-700 hover:text-neutral-200 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-400 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">'>
            Export to Pipe Delimited ( | )
          </button>
        </div>
        <SimpleTable headers={['Name', 'Value']} data={contractVars} />
      </div>
  )
}

export default ContractVariables
