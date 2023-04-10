import {useContext, useEffect, useState} from 'react';
import {ContractContext} from '/src/components/providers/contractProvider.jsx';
import {Alert} from '/src/components/common/Alert.jsx';
import Accordion from '/src/components/common/Accordion.jsx';
import Card from '/src/components/common/Card.jsx';
import ContractFunction from '/src/components/contract/ContractFunction.jsx';
import ContractVariables from '/src/components/contract/ContractVariables.jsx';
import {ContractUtils} from '/src/utils/contractHelper.js';
import {CurrencySymbol, ZeroAddress} from '/src/enums/DeroContractConstants.js';
import ContractBalances from '/src/components/contract/ContractBalances.jsx';
import {SaveSCToList} from "@/components/SaveSCToList.jsx";

export const Contract = () => {
  const {
    scid,
    hasData,
    balanceList,
    contractVars,
    functions
  } = useContext(ContractContext);
  const [openModal, openModalSet] = useState(false);

  const storedData = JSON.parse(localStorage.getItem('myDeroSCList'));

  const handleSave = () => {
    openModalSet(true)
  }

  const handleModalClose = () => {
    openModalSet(false)
  }

  const isInList = storedData && storedData.some(obj => {
    return Object.keys(obj).some(key => {
      return obj[key].includes(scid)
    })
  })

  useEffect(() => {
    console.log('Just need this to force rerender when openModal changes')
  }, [openModal])

  return (
    <>
      {hasData ?
        <div className='container mx-auto pb-20'>
          <div className='ml-8 text-md'>
            {
              scid.length ?
                <>
                  <span className='text-purple-500'>Dero Smart Contract Components For SCID:</span> {scid}
                  <span className='pl-4 text-green-600 cursor-pointer' onClick={handleSave}>
                    {storedData && isInList ? '' : 'Save To My List'}
                  </span>
                  <span>
                    {openModal && <SaveSCToList handleClose={handleModalClose} scid={scid} />}
                  </span>
                </> : ''
            }
          </div>
          {contractVars && <Card title={`Contract Balance: ${ContractUtils.atomicUnitsToDero(balanceList.filter(obj => obj.wallet === ZeroAddress.ZERO_ADDRESS)[0].value)} ${CurrencySymbol.DERO}`}>
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
                <div className="flex flex-wrap -mx-4 px-4">
                  {functions.map((item) =>
                    <Accordion key={item.name} name={item.name} comment={item.args ? `Function Args: ${item.args.length}` : ''}>
                      <ContractFunction name={item.name} code={item.code} args={item.args} />
                    </Accordion>
                  )}
                </div>
            </section>
          </Card> }
        </div>
        :
        <div className='h-screen flex flex-column justify-center pt-40 w-full'>
          <Alert message={scid.length ? 'Query returned no data' : 'Welcome & Enjoy'} />
        </div>}
    </>
  );
}