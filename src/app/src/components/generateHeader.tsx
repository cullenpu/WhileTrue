import * as React from 'react';

interface Props {
    headerText: string;
  }

  const HeaderText = ({ headerText}:Props) => {
  
    return (
        <>
        <div className="header">
          {headerText}
        </div>
        <style>{`
          .header{
            position: absolute;
            height: 64px;
            left: 35.14%;
            right: 35.14%;
            top: 131px;

            font-family: Ubuntu;
            font-style: normal;
            font-weight: bold;
            font-size: 50px;
            line-height: 64px;
            /* identical to box height, or 128% */

            text-align: center;

            color: #505D68;
          }
        `}</style>
      </>
    );
  };
  
  export default HeaderText;