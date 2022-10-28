
const Card = ({title, children}) => {

  return (
    <div className='w-full pt-6'>
      <div className='bg-sky-900 rounded-lg overflow-hidden mb-1'>
        <div className='p-4 text-left'>
          <h3 className='text-lg text-neutral-200 mb-2 block'>
            {title}
          </h3>
        </div>
        <div>
          {children}
        </div>
      </div>
    </div>
  )
}

export default Card
