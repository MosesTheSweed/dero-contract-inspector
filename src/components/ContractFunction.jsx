import PropTypes from 'prop-types';

const ContractFunction = ({code, args}) => {

  // TODO make onSubmit work to call a bridge api func -- see Apollos code
  return (
    <div className='pb-3 px-6 text-neutral-200 divide-y divide-solid divide-purple-400'>
      <div>
        <pre>{code}</pre>
      </div>
      {args && args.length && args[0].name ?
        <form onSubmit={() => console.log('submitted')}>
          <div className='text-lg pt-2 text-neutral-300'>Update Contract Values</div>
          <div className='py-3 flex flex-row justify-start items-end'>
            {/*<input placeholder="fee" id="fee" type="text"/>{props.ints?props.ints.map((z,i)=>*/}
            {/*<input placeholder={z} id={`int${i}`} type="text"/>):""}{props.strs?props.strs.map((z,i)=>*/}
            {/*<input placeholder={z} id={`str${i}`} type="text"/>):""}*/}
            <div className='flex flex-col'>
              {args.map((arg) =>
                <div key={arg.name} className='p-2 text-white'>
                  <input
                    className='p-2 rounded-sm bg-sky-100 text-slate-800 placeholder-slate-400 placeholder-opacity-75'
                    id={arg.name} type={arg.type === 'String' ? 'text' : 'number'} placeholder={arg.name} />
                </div>
              )}
            </div>
            <div className='pb-2 px-10'>
              <button type='submit'
                      className='inline-flex py-2 pl-2 pr-3 ml-2 text-md font-medium text-stone-800 bg-cyan-400 rounded-lg border border-cyan-700 hover:bg-cyan-500 hover:text-neutral-200 focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:bg-cyan-400 dark:hover:bg-cyan-500 dark:focus:ring-cyan-800'>
                Execute
              </button>
            </div>
          </div>
        </form>
        : <></>
      }
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