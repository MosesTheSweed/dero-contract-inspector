import {useContext} from 'react';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';
import {Alert} from '/src/components/common/Alert.jsx';
import Accordion from '/src/components/common/Accordion.jsx';
import Card from '/src/components/common/Card.jsx';
import ContractFunction from '/src/components/ContractFunction.jsx';
import ContractVariables from '/src/components/ContractVariables.jsx';

export const Contract = () => {
  const {
    scid,
    hasData,
    displayBalance,
    contractVars,
    functions,
  } = useContext(ContractContext);

  console.log('HAS DATA IN CONTRACT', hasData);
  console.log('Funcs', functions);
  console.log('Vars', contractVars);
  console.log('Balance', displayBalance);

  // TODO - Break up Accordion to have functionality & container with a Card for its body??
  // TODO - Generalize Card as well - need diff layouts for contract vs variables
  // TODO - Make Alert dynamic with a msg & position & color
  // TODO - display args & make then usable/submitable -- need to create 'trasnfer' api -- see apollos site for his code to upd contract vars
  // TODO - Set up theme using tailwind at some point at least for color palette

  return (
    <>
      {hasData ?
        <>
          <div className='ml-3 text-md'>
            {scid.length ? <><span className='text-purple-500'>Dero Smart Contract Components For SCID:</span> {scid}</> : ''}
          </div>
          {contractVars && <Card title={`Contract Balance: ${displayBalance}`}>
            <Accordion name='Contract Variables'>
              <ContractVariables contractVars={contractVars} />
            </Accordion>
          </Card>
           }
          <section className='pt-10 pb-10'>
            <div className='container'>
              <div className="flex flex-wrap -mx-4">
                {functions.map((item) =>
                  <Accordion key={item.name} name={item.name} comment={item.args ? `Function Args: ${item.args.length}` : ''}>
                    <ContractFunction code={item.code} args={item.args} />
                  </Accordion>
                )}
              </div>
            </div>
          </section>
        </>
        :
        <Alert />}
    </>
  );
}