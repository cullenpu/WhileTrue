import * as React from 'react';

interface Props {
    tittleText: string;
    
  }

  const GenerateTittleText = ({ tittleText }:Props) => {
  
    return (
        <>
        <p className="tittletext">
          {tittleText}
        </p>
        <style>{`
          .tittletext {
            
            font-family: Ubuntu;
            font-style: normal;
            font-weight: bold;
            font-size: 21px;
            line-height: 31px;
            
            color: #505D68;
          }
        `}</style>
      </>
    );
  };
  
  export default GenerateTittleText;