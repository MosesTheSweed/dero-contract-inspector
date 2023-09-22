import {Header} from "@/components/header/Header.jsx";
import {Contract} from "@/components/contract/Contract.jsx";


export const ResultsPage = () => {
  return (
    <div className='content mx-auto h-full text-gray-400 bg-gray-900 body-font'>
      <Header />
      <div className='mx-auto pt-4'>
        <Contract />
      </div>
    </div>
  );
}