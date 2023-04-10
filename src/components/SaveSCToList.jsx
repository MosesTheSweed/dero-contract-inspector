import {useEffect, useState} from "react";
import Modal from 'react-modal';

const customStyles = {
  content: {
    top: '30%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    height: '225px',
    transform: 'translate(-50%, -50%)',
    color: '#e5e5e5',
    backgroundColor: '#0f172a'
  },
};

export const SaveSCToList = ({handleClose, scid}) => {
  const [formData, formDataSet] = useState()
  const [modalOpen, modalOpenSet] = useState(true)
  const storedData = JSON.parse(localStorage.getItem('myDeroSCList'));

  const closeModal = () => {
    modalOpenSet(false)
  }

  const afterOpenModal = () => {
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    const scData = storedData ? [...storedData, {name: formData.scName, scid: formData.scid}] : [{name: formData.scName, scid: formData.scid}]
    localStorage.setItem('myDeroSCList', JSON.stringify(scData))
    handleClose()
  }

  const handleChange = (event) => {
    formDataSet({
      [event.target.name]: event.target.value.trim(),
      scid: scid
    })
  }

  return (
    <>
      <Modal
        isOpen={modalOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        contentLabel='My Saved Dero SCs'
        style={customStyles}
        appElement={document.getElementById('root')}
      >
        <div className='flex flex-row justify-between'>
          <h2>Save To My SC List</h2>
          <button className='text-slate-200 p-1 rounded bg-slate-500' onClick={closeModal}>X</button>
        </div>
        <hr className='py-1 mt-2'/>
          <form>
            <div className='flex flex-col p-3 gap-3'>
              <input className='p-1 rounded text-slate-600' name='scName' onChange={handleChange} type='text' placeholder='Contract Name' />
              <button type='submit' className='text-slate-200 bg-sky-500 rounded p-3' onClick={handleSubmit}>Save</button>
            </div>
          </form>
      </Modal>
    </>
  )
}