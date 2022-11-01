import {useCallback, useContext} from 'react';
import to from 'await-to-js';
import {BridgeContext} from '/src/components/providers/bridgeProvider.jsx';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';

// Hardcoding for now
const RINGSIZE = 2;

export const useCallContract = () => {
  const {deroBridgeApi} = useContext(BridgeContext);
  const {dataString} = useContext(ContractContext);

  const callContract = useCallback(async (scid, scRpc, transfers, fee) => {

    let payload = {scid: scid, ringsize: RINGSIZE, sc_rpc: scRpc}
    if (fee) {
      payload = {fees: fee, ...payload}
    }
    if (transfers.length) {
      payload = {transfers: transfers, ...payload}
    }

    if (scRpc.length) {
      const [err, res] = await to(deroBridgeApi.wallet('start-transfer', payload))
    }
  }, [dataString])

  return {callContract}
}