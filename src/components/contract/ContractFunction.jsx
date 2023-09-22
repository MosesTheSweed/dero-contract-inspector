import {useContext, useState} from 'react';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';
import PropTypes from 'prop-types';
import Tooltip from '/src/components/common/Tooltip.jsx';
import {ContractUtils} from '/src/utils/contractHelper.js';
import {useCallContract} from '/src/hooks/useCallContract.js';

const ContractFunction = ({name, code, args}) => {
  const monetaryFields = ContractUtils.getFunctionMonetaryInputs()
  const {scid, dataStringSet} = useContext(ContractContext);
  const {callContract} = useCallContract();
  const [textareaFields, setTextareaFields] = useState({});

  const toggleTextarea = (fieldName, event) => {
    event.preventDefault();
    event.stopPropagation();

    setTextareaFields(prevState => ({
      ...prevState,
      [fieldName]: !prevState[fieldName]
    }));
  };


  const handleSubmit = (event) => {
    // Get Submitted Form Data
    const formData = new FormData(event.currentTarget)
    event.preventDefault()
    // Prepare payload
    const {
      scRpcData,
      transferData,
      feeData,
      currentDataSignature
    } = ContractUtils.packageContractPayload(formData, name, code, args);

    // Set dependency & call contract so it will execute if data has changed since previous execute
    dataStringSet(currentDataSignature);
    callContract(scid, scRpcData, transferData, feeData)
  }

  return (
    <div className='pb-3 px-6 text-neutral-200 divide-y divide-solid divide-purple-400'>
      <div className='pb-3'>
        <pre>{code}</pre>
      </div>
      <form onSubmit={handleSubmit} name={name}>
        <div className='text-2xl pt-4 text-neutral-300'>Update Contract Values   <span className='text-xs font-mono'>(Dero Amount fields require atomic units -- 1 Dero === 100000)</span></div>
        <div className='pt-4 flex flex-row justify-start items-start text-purple-300'>
          <div className='basis-1/4 pl-10'>Monetary Options</div>
          <div className='basis-1/4'>Function Arguments</div>
          <div className='basis-1/2'>&nbsp;</div>
        </div>
        <div className='py-3 flex flex-row justify-start items-end'>
          <div className='flex flex-col'>
            {monetaryFields.map((field) =>
              <div key={field.name} className='p-2 text-white flex flex-row justify-start'>
                <Tooltip message={field.toolTip} />
                <input
                  className='p-2 rounded-md bg-slate-900 text-neutral-50 placeholder-purple-300 placeholder-opacity-75 font-mono'
                  name={field.name} type={field.type === 'String' ? 'text' : 'number'} placeholder={`${field.name}   ${field.type}`} />
              </div>
            )}
          </div>
          {args && args.length && args[0].name ? (
            <div className="flex flex-col">
              {args.map((arg) => (
                <div key={arg.name} className="p-2 text-white flex items-center">
                  {arg.type === "String" ? (
                    <div className="flex border-black rounded-md overflow-hidden w-full">
                      {textareaFields[arg.name] ? (
                        <textarea rows='10' cols='80'
                          className="flex-grow p-2 bg-slate-900 text-neutral-50 placeholder-purple-300 placeholder-opacity-75 font-mono"
                          name={arg.name}
                          placeholder={`${arg.name}   ${arg.type}`}
                        />
                      ) : (
                        <input
                          className="flex-grow p-2 bg-slate-900 text-neutral-50 placeholder-purple-300 placeholder-opacity-75 font-mono"
                          name={arg.name}
                          type="text"
                          placeholder={`${arg.name}   ${arg.type}`}
                        />
                      )}
                      <button
                        onClick={(e) => toggleTextarea(arg.name, e)}
                        className="px-3 bg-gray-700 text-xs hover:bg-gray-600 focus:bg-gray-700 transition"
                      >
                        {textareaFields[arg.name] ? "Input" : "Textarea"}
                      </button>
                    </div>
                  ) : (
                    <input
                      className="p-2 rounded-md bg-slate-900 text-neutral-50 placeholder-purple-300 placeholder-opacity-75 font-mono w-full"
                      name={arg.name}
                      type="number"
                      placeholder={`${arg.name}   ${arg.type}`}
                    />
                  )}
                </div>
              ))}
            </div>
          ) : null}
          <div className='pb-2 px-10'>
            <button type='submit' id={name}
              className='inline-flex py-2 pl-2 pr-3 ml-2 text-md font-medium text-stone-800 bg-cyan-400 rounded-lg border border-cyan-700 hover:bg-cyan-500 hover:text-neutral-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:focus:ring-cyan-800'>
              {name}
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

ContractFunction.propTypes = {
  code: PropTypes.string.isRequired,
  args: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string,
    type: PropTypes.string
  }))
}
export default ContractFunction