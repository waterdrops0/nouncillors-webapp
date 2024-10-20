import React from 'react';

const RecruitmentProcess = () => {
  return (
    <div className="flex items-center space-x-4">
      <div className="bg-red-500 text-white p-8 flex-grow">
        <h2 className="text-2xl font-bold mb-4">Nouncil Recruitment Process</h2>
        <ol className="list-decimal ml-6">
          <li className="mb-2">Submit your application.</li>
          <li>Attend an interview session.</li>
        </ol>
      </div>
      <button className="bg-white text-black px-8 py-4 border-none w-40 h-40 flex justify-center items-center text-lg font-medium cursor-pointer">
        Click here to apply
      </button>
    </div>
  );
};

export default RecruitmentProcess;
