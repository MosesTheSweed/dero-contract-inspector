import {useContext, useEffect} from 'react';
import {useGetContract} from '/src/hooks/useGetContract.js';
import {ContractContext} from "@/components/providers/contractProvider.jsx";

export const SearchBar = () => {
  const {getContract} = useGetContract();
  const {scid, scidSet} = useContext(ContractContext);

  useEffect(() => {
    if (scid) {
      getContract();
    }
  }, [scid])

  const handleSubmit = (event) => {
    event.preventDefault();
    scidSet(event.target.scid.value)
  }

  const handleChange = (event) => {
    scidSet(event.target.value)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form className="flex flex-row" onSubmit={handleSubmit}>
        <label htmlFor="scid" className="sr-only">Search</label>
        <div className="w-full">
          <input type="text" id="scid"
             className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
             value={scid}
             onChange={handleChange}
             placeholder="Enter SCID..." required />
        </div>
      </form>
    </div>
  )
}
