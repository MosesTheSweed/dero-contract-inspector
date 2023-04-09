import {useContext} from "react";
import {SearchBar} from '/src/components/header/SearchBar.jsx';
import {BridgeContext} from '/src/components/providers/bridgeProvider.jsx';
import {BridgeStatus} from '/src/enums/BridgeStatus.js';
import Tooltip from "@/components/common/Tooltip.jsx";
import {SelectSavedContract} from "@/components/header/SelectSavedContract.jsx";

export const Header = () => {
  const {deroBridgeStatus} = useContext(BridgeContext);

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
        <SelectSavedContract />
      </div>
    </header>
  );
}
