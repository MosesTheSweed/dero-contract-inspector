import {useContext, useEffect, useState} from 'react';
import {useGetContract} from '/src/hooks/useGetContract.js';
import {ContractContext} from "@/components/providers/contractProvider.jsx";
import {useParams} from "react-router-dom";

export const SearchBar = () => {
  const {getContract} = useGetContract();
  const {scid, scidSet} = useContext(ContractContext);
  const [trigger, triggerSet] = useState(false)
  const {searchParam} = useParams()

  useEffect(() => {
    if (searchParam) {
      scidSet(searchParam)
    }
  }, [searchParam])

  useEffect(() => {
    if (scid) {
      getContract();
    }
  }, [scid, trigger])

  const handleSubmit = (event) => {
    window.location.hash = `/${event.target.scid.value}`
  }

  const handleChange = (event) => {
    window.location.hash = `/${event.target.value}`
  }

  const handleRefresh = (event) => {
    event.preventDefault();
    triggerSet(!trigger)
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form className="flex flex-row" onSubmit={handleSubmit}>
        <div className="w-full">
          <label className='flex align-center border-2 border-blue-800 focus:border-blue-500 rounded-lg'>
            <input type="text" id="scid"
               className="bg-gray-50 border text-gray-900 text-sm rounded-l-lg focus:ring-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
               value={scid}
               onChange={handleChange}
               placeholder="Enter SCID..." required />
            <span className='m-2 hover:text-blue-800 cursor-pointer' onClick={handleRefresh}>Refresh</span>
          </label>
        </div>
      </form>
    </div>
  )
}
