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
        SEARCH
      </button>
     
      <GenerateInput2 />

      <input type='text' className='ipt3' placeholder='Enter any other keywords you want to prompt the AI with'/>

      <button type='button' style={{position: "absolute", top: "717px", left: "889px", border: "solid black 1px", borderRadius: "4px", width: "165px", height: "40px"}}>
        FRIENDLY
      </button>

      <button type='button' id='b1' style={{position: "absolute", top: "717px", left: "1084px", border: "solid black 1px", borderRadius: "32px", width: "165px", height: "40px"}}>
        GENERATE
      </button>
 
      <style>{`
        
        button:hover {
          background-color: #505D68;
          color: white;
        }
        #b1 {
          background-color: #505D68;
          color: white;
        }
        #b1:hover {
          background-color: white;
          color: black; 
        }
        .ipt3 {
          position: absolute;
          top: 482px;
          left: 191px;
          Width: 1020px;
          Height: 146px;
          
          // padding-top: 54px;
          padding-left: 44px;
          
          border-radius: 12px;
          border: solid black 1px;

        }
        ::placeholder {
          font-size: 12px;
          color: #D8D8D8;
        }
        input[type="text"].ipt3::placeholder{
          font-size: 12px;
          color: #A1AEB7;
        }
      `}</style>
    </>
  );
};
