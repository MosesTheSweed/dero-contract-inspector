import {useContext} from "react";
import {ContractContext} from "@/components/providers/contractProvider.jsx";


export const SelectSavedContract = () => {
  const {scid, scidSet} = useContext(ContractContext);

  const handleSelectChange = (event) => {
    if (event.target.value) {
      scidSet(event.target.value)
    }
  }

  return (
    <>
      <select value={scid} onChange={handleSelectChange} className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-sky-900 focus:border-sky-700 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
        <option value="">My saved contracts...</option>
        <option value="df3c71867a88dd0cbb9d05f515ff982ac00faa1e31f86e57760e76d09b081c87">Rando</option>
        <option value="cfbd566d3678dec6e6dfa3a919feae5306ab12af1485e8bcf9320bd5a122b1d3">DerBnB</option>
      </select>
    </>
  )
}