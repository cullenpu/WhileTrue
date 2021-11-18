import * as React from 'react';
import HeaderText from '../components/generateHeader';
import GenerateTittle1 from '../components/generateTittle1';
import GenerateTittle2 from '../components/generateTittle2';


export const GenerateCopy = () => {
  return (
    <>
      <HeaderText headerText="Generate Content"/>
      
      <GenerateTittle1 tittleText1='Offer'/>
               
      <button type='button' style={{position: "absolute", top: "270px", left: "191px", border: "solid black 1px", borderRadius: "4px", width: "165px", height: "40px"}}>
        SEARCH
      </button>

      <GenerateTittle2 tittleText='Client Segment'/>

      <button type='button' style={{position: "absolute", top: "375px", left: "191px", border: "solid black 1px", borderRadius: "4px", width: "165px", height: "40px"}}>
        EARCH
      </button>
     
      
 
      <style>{`
        
        button:hover {
          background-color: #505D68;
          color: white;
        }
      `}</style>
    </>
  );
};
