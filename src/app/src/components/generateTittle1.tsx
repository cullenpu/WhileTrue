import * as React from 'react';

interface Props {
    tittleText1: string;
    
  }

  const GenerateTittle1 = ({ tittleText1: headerText}:Props) => {
  
    return (
        <>
        <div className="tittle1">
          {headerText}
        </div>
        <style>{`
          .tittle1 {
            position: absolute;
            left: 191px;
            top: 224px;


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
  
  export default GenerateTittle1;