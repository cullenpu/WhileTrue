import * as React from 'react';
<<<<<<< HEAD

import { GenerateForm } from '../components/GenerateForm';
=======
import HeaderText from '../components/generateHeader';
import GenerateTittle1 from '../components/generateTittle1';
import GenerateTittle2 from '../components/generateTittle2';

>>>>>>> d19567d (genertate content buttons and tittles)

export const GenerateCopy = () => {
  return (
    <>
<<<<<<< HEAD
      <GenerateForm />
=======
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
>>>>>>> d19567d (genertate content buttons and tittles)
    </>
  );
}



  