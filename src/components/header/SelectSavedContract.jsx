import {useContext} from "react";
import {ContractContext} from "@/components/providers/contractProvider.jsx";


export const SelectSavedContract = () => {
  const {scid, scidSet} = useContext(ContractContext);

  const storedData = JSON.parse(localStorage.getItem('myDeroSCList'));
  console.log('Parsed Stored Data', storedData)

  const handleSelectChange = (event) => {
    if (event.target.value) {
      scidSet(event.target.value)
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

// <option value="df3c71867a88dd0cbb9d05f515ff982ac00faa1e31f86e57760e76d09b081c87">Rando</option>
// <option value="ce7b89d40dda52955619544b1eec5ca35e724bd9528818d1fb59ad63669368e5">RandoTwo</option>
// <option value="cfbd566d3678dec6e6dfa3a919feae5306ab12af1485e8bcf9320bd5a122b1d3">DerBnB</option>
