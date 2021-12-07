import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import SavedContentTable from '../components/SavedContentTable';
import { Dashboard } from '../pages/Dashboard';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const content = [
  {
    id: '1',
    contentTitle: 'title1',
    contentBody: 'body1',
    time: '1',
  },
  {
    id: '2',
    contentTitle: 'title2',
    contentBody: 'body2',
    time: '2',
  },
];

const contentTableProps = {
  content,
};

// Mocking the graph as amCharts cannot be used with jest
// See https://www.amcharts.com/docs/v4/getting-started/using-typescript-or-es6/#Using_amCharts_with_Jest
jest.mock('../components/Graph', () => () => <div data-testid="graph">Graph</div>);

describe('<Dashboard />', () => {
  it('should render the LoginForm', () => {
    const { getByTestId } = render(<Dashboard />);
    const graph = getByTestId('graph');
    const savedContentTable = getByTestId('saved-content-table');
    expect(graph).toBeInTheDocument();
    expect(savedContentTable).toBeInTheDocument();
  });

  it("should fetch user's data", async () => {
    mockAxios.create = jest.fn(() => mockAxios);
    mockAxios.get.mockResolvedValue({ data: [] });

    const { queryAllByTestId } = render(<Dashboard />);
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    const savedContentCard = queryAllByTestId('saved-content-card');
    expect(savedContentCard).toHaveLength(0);
  });
});

describe('<SavedContentTable />', () => {
  it(`should render ${content.length} content cards`, () => {
    const { getAllByTestId } = render(<SavedContentTable {...contentTableProps} />);
    const savedContentCard = getAllByTestId('saved-content-card');
    expect(savedContentCard).toHaveLength(content.length);
  });
});
