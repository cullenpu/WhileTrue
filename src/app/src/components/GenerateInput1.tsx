import * as React from 'react';

// interface Props {
//     input1: string;
    
//   }

  const GenerateInput1 = () => {
  
    return (
        <>
        <input type='text' className='ipt1' placeholder='TEXT: Open an air miles mastercard and get 5% cash back for the first 6 months!, UNIT: %, AMOUNT: 5, TYPE: CREDIT CARD'/>
        <style>{`
          .ipt1 {
            position: absolute;
            top: 272px;
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
  
  export default GenerateInput1;