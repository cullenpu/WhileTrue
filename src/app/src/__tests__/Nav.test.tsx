import { render } from '@testing-library/react';
import React from 'react';
import Nav from '../components/Nav';

describe('<Nav />', () => {
  it('should contain links to the 3 main pages: dashboard, data input, create', async () => {
    const { getByText } = render(<Nav />);
    expect(getByText('Dashboard')).toBeInTheDocument();
    expect(getByText('Data Input')).toBeInTheDocument();
    expect(getByText('Create')).toBeInTheDocument();
    expect(getByText('Profile')).toBeInTheDocument();
    expect(getByText('Logout')).toBeInTheDocument();
  });
});
