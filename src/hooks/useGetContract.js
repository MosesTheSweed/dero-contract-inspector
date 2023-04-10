import {useCallback, useContext} from 'react';
import to from 'await-to-js';
import {BridgeContext} from '/src/components/providers/bridgeProvider.jsx';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';
import {ContractUtils} from '/src/utils/contractHelper.js';

export const useGetContract = () => {
  const {deroBridgeApi} = useContext(BridgeContext);
  const {scid, scidSet, hasDataSet, balanceListSet, contractVarsSet, functionsSet} = useContext(ContractContext);

  const getContract = useCallback(async () => {
    if (scid && deroBridgeApi) {
      const [err, res] = await to(deroBridgeApi.daemon('get-sc', {
        scid: scid,
        code: true,
        variables: true
      }))

      // If err, status not 'OK', or no contract data, we send a msg to the user
      if (err || (res && res.data?.result?.status !== 'OK') || (res && !res.data?.result?.code)) {
        hasDataSet(false);
      } else {
        hasDataSet(true);
        functionsSet(ContractUtils.getFunctionData(res.data.result.code))
        contractVarsSet(ContractUtils.getVariables(res.data.result.stringkeys))
        balanceListSet(ContractUtils.getBalances(res.data.result.balances))
      }
    }
  }, [deroBridgeApi, scid])

  return {getContract}
}
