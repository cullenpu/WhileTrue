import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import App from '../App';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

// Mocking the graph as amCharts cannot be used with jest
// See https://www.amcharts.com/docs/v4/getting-started/using-typescript-or-es6/#Using_amCharts_with_Jest
jest.mock('../components/Graph', () => () => <div data-testid="graph">Graph</div>);

describe('<App />', () => {
  it('should check if user is logged in', async () => {
    mockAxios.create = jest.fn(() => mockAxios);
    mockAxios.get.mockResolvedValue({ data: [] });

    render(<App />);
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });
  });
});
