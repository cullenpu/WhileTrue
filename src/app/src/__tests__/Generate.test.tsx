import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import { Generate } from '../pages/Generate';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('<Generate />', () => {
  it('should display offer and client segment search bars and fetch backend data', async () => {
    const { getAllByTestId } = render(<Generate />);
    const genSearchBar = getAllByTestId('gen-search-bar');
    await waitFor(() => {
      expect(genSearchBar).toHaveLength(2);
    });
  });

  it('should fetch offer and client segment data to populate search bars', async () => {
    mockAxios.create = jest.fn(() => mockAxios);
    mockAxios.get.mockResolvedValue({ data: [] });

    const { queryAllByTestId } = render(<Generate />);
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });
  });
});
