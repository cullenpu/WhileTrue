import * as React from 'react';

interface Props {
    tittleText: string;
    
  }

  const GenerateTittle2 = ({ tittleText: headerText}:Props) => {
  
    return (
        <>
        <div className="tittle2">
          {headerText}
        </div>
        <style>{`
          .tittle2 {
            position: absolute;
            left: 191px;
            top: 328px;


            font-family: Ubuntu;
            font-style: normal;
            font-weight: bold;
            font-size: 21px;
            line-height: 31px;
            /* identical to box height, or 148% */


            color: #505D68;
          }
        `}</style>
      </>
    );
  };
  
  export default GenerateTittle2;