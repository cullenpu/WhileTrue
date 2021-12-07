import { fireEvent, render } from '@testing-library/react';
import React from 'react';
import LoginForm from '../components/LoginForm';
import { Login } from '../pages/Login';

describe('<Login />', () => {
  it('should render the LoginForm', () => {
    const { getByTestId } = render(<Login />);
    const loginForm = getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
  });
});

describe('<LoginForm />', () => {
  const defaultProps = {
    onEmailSubmit() {
      return;
    },
    disabled: false,
  };

  it('should display a blank login form', () => {
    const { getByTestId } = render(<LoginForm {...defaultProps} />);
    const loginForm = getByTestId('login-form');
    expect(loginForm).toBeInTheDocument();
    const emailInput = getByTestId('email');
    expect(emailInput).toHaveValue('');
  });

  it('should allow entering an email', () => {
    const onEmailSubmit = jest.fn();
    const loginProps = {
      onEmailSubmit,
    };
    const { getByTestId } = render(<LoginForm {...defaultProps} {...loginProps} />);
    const loginForm = getByTestId('login-form');
    const email = getByTestId('email');
    fireEvent.change(email, { target: { value: 'test-email' } });
    fireEvent.submit(loginForm);
    expect(onEmailSubmit).toHaveBeenCalledWith('test-email');
  });
});
