import React from 'react';
import Modal from 'react-modal';
const customStyles = {
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    width: '70%',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: '#1F2937',
    overflow: 'auto',
    maxHeight: 'calc(100vh - 125px)'
  }
};

function MyModal(props) {
  function afterOpenModal(e) {
    props.onAfterOpen(e, 'After Modal Opened');
  }

  function onModalClose(event) {
    let data = { name: 'example', type: 'closed from child' };
    props.onCloseModal(event, data);
  }

  return (
    <div>
      <Modal
        isOpen={props.IsModalOpened}
        onAfterOpen={e => afterOpenModal(e)}
        style={customStyles}
        ariaHideApp={false}
      >
        <div className="flex flex-row justify-between bg-purple-800 text-neutral-200 px-3">
          <h2>{props.dynData && props.dynData.name}</h2>
          <button onClick={e => onModalClose(e)}>Close</button>
        </div>
        <div>
          <ul className='text-neutral-200 whitespace-pre-wrap'>
            {props.dynData && props.dynData.value}
          </ul>
        </div>
      </Modal>
    </div>
  );
}

export default MyModal;