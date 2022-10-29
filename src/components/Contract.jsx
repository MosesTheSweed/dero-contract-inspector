import {useContext} from 'react';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';
import {Alert} from '/src/components/common/Alert.jsx';
import Accordion from '/src/components/common/Accordion.jsx';
import Card from '/src/components/common/Card.jsx';
import ContractFunction from '/src/components/ContractFunction.jsx';
import ContractVariables from '/src/components/ContractVariables.jsx';
import {ContractUtils} from '/src/utils/contractHelper.js';
import {ZeroAddress} from '/src/enums/DeroContractConstants.js';
import ContractBalances from '/src/components/ContractBalances.jsx';

export const Contract = () => {
  const {
    scid,
    hasData,
    balanceList,
    contractVars,
    functions,
  } = useContext(ContractContext);

  //console.log('Funcs', functions);
  // console.log('Bals', balanceList);

  return (
    <>
      {hasData ?
        <>
          <div className='ml-3 text-md'>
            {scid.length ? <><span className='text-purple-500'>Dero Smart Contract Components For SCID:</span> {scid}</> : ''}
          </div>
          {contractVars && <Card title={`Contract Balance: ${ContractUtils.atomicUnitsToDero(balanceList.filter(obj => obj.wallet === ZeroAddress.ZERO_ADDRESS)[0].value)} DERO`}>
            {balanceList.length > 1 ?
            <Accordion name='Contract Balances'>
              <ContractBalances balances={balanceList} />
            </Accordion>
              : <></>}
            <Accordion name='Contract Variables'>
              <ContractVariables contractVars={contractVars} />
            </Accordion>
          </Card>
           }
          {functions && <Card title='Functions'>
            <section className='pt-1 pb-5'>
              <div className='container'>
                <div className="flex flex-wrap -mx-4 px-4">
                  {functions.map((item) =>
                    <Accordion key={item.name} name={item.name} comment={item.args ? `Function Args: ${item.args.length}` : ''}>
                      <ContractFunction code={item.code} args={item.args} />
                    </Accordion>
                  )}
                </div>
              </div>
            </section>
          </Card> }
        </>
        :
        <div className='flex flex-column justify-center pt-40 w-full'>
          <Alert message={scid.length ? 'Query returned no data' : 'Welcome & Enjoy'} />
        </div>}
    </>
  );
}