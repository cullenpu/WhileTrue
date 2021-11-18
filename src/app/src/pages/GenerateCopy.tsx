import * as React from 'react';
import HeaderText from '../components/generateHeader';
import GenerateInput1 from '../components/GenerateInput1';
import GenerateInput2 from '../components/GenerateInput2';
import GenerateTittle from '../components/generateTittle'


export const GenerateCopy = () => {
  return (
    <>
      <HeaderText headerText="Generate Content"/>
      
      <GenerateTittle />

      <button type='button' style={{position: "absolute", top: "270px", left: "191px", border: "solid black 1px", borderRadius: "4px", width: "165px", height: "40px"}}>
        SEARCH
      </button>

      
      <GenerateInput1 />

      <button type='button' style={{position: "absolute", top: "375px", left: "191px", border: "solid black 1px", borderRadius: "4px", width: "165px", height: "40px"}}>
        EARCH
      </button>
     
      <GenerateInput2 />

 
      <style>{`
        
        button:hover {
          background-color: #505D68;
          color: white;
        }
        
      `}</style>
    </>
  );
};
