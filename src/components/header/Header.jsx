import {useContext} from "react";
import {SearchBar} from '/src/components/header/SearchBar.jsx';
import {BridgeContext} from '/src/components/providers/bridgeProvider.jsx';
import {BridgeStatus} from '/src/enums/BridgeStatus.js';
import {ContractContext} from "@/components/providers/contractProvider.jsx";
import Tooltip from "@/components/common/Tooltip.jsx";

export const Header = () => {
  const {deroBridgeStatus} = useContext(BridgeContext);
  const {scid, scidSet} = useContext(ContractContext);

  const handleSelectChange = (event) => {
    if (event.target.value) {
      scidSet(event.target.value)
    }
  }

  return (
    <header className="bg-gray-900">
      <div className="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
        <span className="ml-3 text-xl">Dero Contract Inspection</span>
        <span className="md:ml-auto text-sm p-4">
          {deroBridgeStatus === BridgeStatus.CONNECTED ?
            <span className="text-green-600">Bridge Connected</span>
            :
            <span className="text-red-600">Bridge failed to connect...</span>
          }
        </span>
        <Tooltip message='Paste in a Smart Contract ID or Select one you have saved' search={true} />
        <span className="basis-1/2 pl-1 pr-6"><SearchBar /></span>

        <select value={scid} onChange={handleSelectChange} className="bg-gray-50 border border-gray-300 text-slate-800 text-sm rounded-lg focus:ring-sky-900 focus:border-sky-700 block w-48 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
          <option value="">My saved contracts...</option>
          <option value="df3c71867a88dd0cbb9d05f515ff982ac00faa1e31f86e57760e76d09b081c87">Rando</option>
          <option value="cfbd566d3678dec6e6dfa3a919feae5306ab12af1485e8bcf9320bd5a122b1d3">DerBnB</option>
        </select>
      </div>
    </header>
  );
}
