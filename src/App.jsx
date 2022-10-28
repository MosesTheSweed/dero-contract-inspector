import {Contract} from '/src/components/Contract.jsx';
import {Header} from '/src/components/header/Header.jsx';

export const App = () => {
  return (
    <div className='auto w-full h-full text-gray-400 bg-gray-800 body-font'>
      <Header />
      <div className='container mx-auto pt-4'>
        <Contract />
      </div>
    </div>
  );
};