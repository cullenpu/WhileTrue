import { Button, Input } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  onEmailSubmit: Function;
  disabled: boolean;
}

const LoginForm = ({ onEmailSubmit, disabled }: Props) => {
  const [email, setEmail] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onEmailSubmit(email);
  };

  return (
    <>
      <form onSubmit={handleSubmit} data-testid="login-form">
        <h3 className="form-header" id="main">
          Login
        </h3>
        <Input
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={{ width: '80%', margin: '0 auto 20px' }}
          data-testid="email"
        />
        <div>
          <Button size="sm" disabled={disabled} onClick={handleSubmit}>
            Log In
          </Button>
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
      `}</style>
    </>
  );
};

export default LoginForm;
