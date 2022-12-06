import {VerticalScroll} from '/src/components/common/styles/VerticalScroll.jsx';
import {useState} from 'react'
import MyModal from '/src/components/common/Modal';
import {ContractUtils} from '/src/utils/contractHelper.js';

const SimpleTable = ({headers, data}) => {
  const [IsModalOpen, IsModalOpenSet] = useState(false);
  const [modalData, modalDataSet] = useState({})

  const handleOpenModal = (cvar) => {
    modalDataSet({name: cvar.name, value: ContractUtils.hexToJson(cvar.value)})
    openModal()
  }
  const openModal = () => {
    IsModalOpenSet(true)
  }
  const closeModal = () => {
    IsModalOpenSet(false)
  }
  const handleAfterOpen = (event, data) => {
    console.log(event, data)
  }

  return (
    <>
      <div className="md:px-16 pb-6 w-full">
        <div className="shadow overflow-auto rounded border-b border-gray-200">
          <VerticalScroll>
            <table className="min-w-full bg-white">
              <thead className="bg-purple-800 text-neutral-200">
              <tr>
                {headers && headers.map((item) => <th className="w-1/3 text-left py-3 px-4 font-semibold text-sm"
                                                      key={item}>{item}</th>)}
              </tr>
              </thead>
              <tbody className="text-gray-700">
              {data && data.map((item, index) =>
                <tr className={index % 2 === 0 ? 'bg-purple-100' : 'bg-neutral-100'} key={item.name}>
                  <td className="w-1/3 text-left py-3 px-4 cursor-pointer hover:text-lg hover:text-purple-800"
                    onClick={() => handleOpenModal(item)}
                  >
                    {item.name}
                  </td>
                  <td className="w-1/3 text-left py-3 px-4 whitespace-pre-wrap">
                    {item.value}
                  </td>
                </tr>
              )}
              </tbody>
            </table>
          </VerticalScroll>
        </div>
      </div>
      <MyModal
        dynData={modalData}
        IsModalOpened={IsModalOpen}
        onCloseModal={closeModal}
        onAfterOpen={handleAfterOpen}
      />
    </>
  )
}

export default SimpleTable