import {useContext} from "react";
import {ContractContext} from "@/components/providers/contractProvider.jsx";
import {LIST_KEY} from "@/enums/DeroContractConstants.js";


export const SelectSavedContract = () => {
  const {scid} = useContext(ContractContext);

  const storedData = JSON.parse(localStorage.getItem(LIST_KEY));

  const handleSelectChange = (event) => {
    if (event.target.value) {
      window.location.hash = `/${event.target.value}`
    }
  }

  return (
    <>
      <select value={scid} onChange={handleSelectChange} className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-sky-900 focus:border-sky-700 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="" key='NONAME'>My saved contracts...</option>
        {
          storedData && Array.from(storedData).map((item) => {
            return <option value={item.scid} key={item.name}>{item.name}</option>
          })
        }
      </select>
    </>
  )
}
