import {Contract} from '/src/components/contract/Contract.jsx';
import {Header} from '/src/components/header/Header.jsx';

export const App = () => {
  return (
    <div className='content mx-auto h-full text-gray-400 bg-gray-800 body-font'>
      <Header />
      <div className='mx-auto pt-4'>
        <Contract />
      </div>
    </div>
  );
};