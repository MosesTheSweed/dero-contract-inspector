import SearchIcon from '/src/assets/search.svg';
import {useGetContract} from '/src/hooks/useGetContract.js';

export const SearchBar = () => {
  const {getContract} = useGetContract();

  const handleSubmit = (event) => {
    event.preventDefault();
    getContract(event.target.scid.value);
  }

  return (
    <div className="max-w-2xl mx-auto">
      <form className="flex flex-row" onSubmit={handleSubmit}>
        <label htmlFor="scid" className="sr-only">Search</label>
        <div className="w-full">
          <input type="text" id="scid"
                 className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-4 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                 placeholder="Enter SCID..." required />
        </div>
        <button type="submit"
                className="inline-flex items-center py-2.5 pl-2 pr-6 ml-2 text-xs font-medium text-stone-800 bg-cyan-400 rounded-lg border border-blue-700 hover:bg-cyan-700 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-cyan-400 dark:hover:bg-cyan-700 dark:focus:ring-cyan-800">
          <img src={SearchIcon} className="pr-1 w-5 h-5 text-gray-500 dark:text-gray-400" /> Search
        </button>
      </form>
    </div>
  )
}
