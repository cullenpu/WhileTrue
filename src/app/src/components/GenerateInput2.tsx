import * as React from 'react';

// interface Props {
//     input1: string;
    
//   }

  const GenerateInput2 = () => {
  
    return (
        <>
        <input type='text' className='ipt2' placeholder='INCOME RANGE: 100000, age: 25-30, location: toronto, monthly transactions: 100'/>
        <style>{`
          .ipt2 {
            position: absolute;
            top: 375px;
            left: 391px;
            Width: 823px;
            Height: 40px;
            text-align: center;
  
            background-color: #424B5A;
            border-radius: 4px;
  
          }
          ::placeholder {
            font-size: 12px;
            color: #D8D8D8;
          }
          
        `}</style>
      </>
    );
  };
  
  export default GenerateInput2;