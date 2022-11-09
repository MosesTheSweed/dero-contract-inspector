import {VerticalScroll} from '/src/components/common/styles/VerticalScroll.jsx';

const SimpleTable = ({headers, data}) => {

  return (
    <div className="md:px-16 pb-6 w-full">
      <div className="shadow overflow-auto rounded border-b border-gray-200">
        <VerticalScroll>
        <table className="min-w-full bg-white">
          <thead className="bg-purple-800 text-neutral-200">
          <tr>
            {headers && headers.map((item) => <th className="w-1/3 text-left py-3 px-4 font-semibold text-sm" key={item}>{item}</th>)}
          </tr>
          </thead>
          <tbody className="text-gray-700">
            {data && data.map((item, index) =>
              <tr className={index % 2 === 0 ? 'bg-purple-100' : 'bg-neutral-100'} key={item.name}>
                <td className="w-1/3 text-left py-3 px-4">{item.name}</td>
                <td className="w-1/3 text-left py-3 px-4">{item.value}</td>
              </tr>
            )}
          </tbody>
        </table>
      </VerticalScroll>
      </div>
    </div>
  )
}

export default SimpleTable