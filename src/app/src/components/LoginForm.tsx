import { useState } from 'react';
import { MonochromeIcons, CallToAction } from '@magiclabs/ui';

interface Props {
  onEmailSubmit: Function;
  disabled: boolean;
}

const LoginForm = ({ onEmailSubmit, disabled }:Props) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h3 className='form-header'>Login</h3>
        <div className='input-wrapper'>
          <input
            placeholder='Enter your email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}

          />
        </div>
        <div>
          <CallToAction
            leadingIcon={MonochromeIcons.PaperPlane}
            color='primary'
            size='sm'
            disabled={disabled}
            onClick={handleSubmit}
          >
            Send Magic Link
          </CallToAction>
        </div>
      </form>
      <style>{`
        form,
        label {
          display: flex;
          flex-flow: column;
          text-align: center;
        }
        .form-header {
          font-size: 22px;
          margin: 25px 0;
        }
        .input-wrapper {
          width: 80%;
          margin: 0 auto 20px;
        }
      `}</style>
    </>
  );
};

export default LoginForm;