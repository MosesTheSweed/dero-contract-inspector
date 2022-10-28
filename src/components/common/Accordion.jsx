import PropTypes from 'prop-types';
import {useState} from 'react';

const Accordion = ({name, comment, children}) => {
  const [isOpen, isOpenSet] = useState(false)

  return (
    <div className="w-full px-4">
      <div className="bg-sky-700 rounded-lg overflow-hidden mb-5">
        <div
          className="p-3 min-w-max flex flex-row flex-flow justify-between content-center text-neutral-200 text-xl sm:text-[22px] md:text-xl lg:text-[22px] xl:text-xl 2xl:text-[22px] m-2 block hover:text-primary">
          <div className='basis-3/12'>
            {name}
          </div>
          {comment ?
            <div className='text-sm'>
              {comment}
            </div>
            : <></>}
          <button className="cursor-pointer text-3xl pr-4" onClick={() => isOpenSet(!isOpen)}>
            {isOpen ? "-" : "+"}
          </button>
        </div>
        {isOpen && children}
      </div>
    </div>
  )
}

Accordion.propTypes = {
  name: PropTypes.string,
}

export default Accordion