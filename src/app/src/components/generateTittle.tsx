import * as React from 'react';
import GenerateTittleText from './generateTittleTxt'
// interface Props {
//     tittleText1: string;
    
//   }

  const GenerateTittle = () => {
  
    return (
        <>
        <div id="tittle1">
            <GenerateTittleText tittleText='Offer'/>
        </div>
        <div id="tittle2">
            <GenerateTittleText tittleText='Client Segment'/>
        </div>
        <div id="tittle3">
            <GenerateTittleText tittleText='Keyword Prompt'/>
        </div>
        <div id="tittle4">
            <GenerateTittleText tittleText='Language Type'/>
        </div>
        <style>{`
            #tittle1 {
                // border: solid 3px green;
                position: absolute;
                left: 191px;
                top: 224px;
              }
            #tittle2 {
                // border: solid 3px green;
                position: absolute;
                left: 191px;
                top: 328px;
              }
            #tittle3 {
                // border: solid 3px green;
                position: absolute;
                top: 433px;
                left: 191px;
              }
            #tittle4 {
            // border: solid 3px green;
            position: absolute;
            top: 722px;
            left: 728px;
            }
          
        `}</style>
      </>
    );
  };
  
  export default GenerateTittle;