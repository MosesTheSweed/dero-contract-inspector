import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faQuestionCircle} from '@fortawesome/free-solid-svg-icons'

const Tooltip = ({message, search=false}) => {

  let classes="[transform:perspective(50px)_translateZ(0)_rotateX(0deg)_translateY(150px)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100";
  if (search) {
    classes="[transform:perspective(50px)_translateZ(0)_rotateX(0deg)_translateY(150px)] group-hover:[transform:perspective(0px)_translateZ(0)_rotateX(0deg)_translateY(120px)] absolute bottom-0 mb-6 origin-bottom transform rounded text-white opacity-0 transition-all duration-300 group-hover:opacity-100";
  }

  return (
    <>
      <a
        className="group relative mx-2"
        href="#">
        <FontAwesomeIcon icon={faQuestionCircle} />
        <div className={classes}>
          <div className="flex max-w-xs flex-col items-center w-32">
            <div className="rounded bg-sky-900 p-2 text-xs text-center shadow-lg">{message}</div>
          </div>
        </div>
      </a>
    </>
  )
}

export default Tooltip
