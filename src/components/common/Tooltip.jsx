import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons'

const Tooltip = ({message}) => {

  return (
    <>
      <a
        className="group relative mx-2"
        href="#">
        <FontAwesomeIcon icon={faQuestionCircle} />
        <div
          className="[transform:perspective(50px)_translateZ(0)_rotateX(10deg)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100">
          <div className="flex max-w-xs flex-col items-center">
            <div className="rounded bg-gray-900 p-2 text-xs text-center shadow-lg">{message}</div>
            <div className="clip-bottom h-2 w-4 bg-gray-900"></div>
          </div>
        </div>
      </a>
    </>
  )
}

export default Tooltip
