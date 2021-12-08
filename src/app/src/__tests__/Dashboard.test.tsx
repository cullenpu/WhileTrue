import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import ContentTable from '../components/ContentTable';
import { Dashboard } from '../pages/Dashboard';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

const content = [
  { clientSegmentId: 1, contentBody: 'content1', offerId: 1, seed: 'seed1', time: new Date(), enableSaving: false },
  { clientSegmentId: 2, contentBody: 'content2', offerId: 2, seed: 'seed2', time: new Date(), enableSaving: false },
];

const contentTableProps = {
  content,
  enableSaving: false,
  contentOffers: [{ offer: 'offer' }, { offer: 'offer' }],
  contentClientSegments: [{ offer: 'clientSegment' }, { offer: 'clientSegment' }],
};

// Mocking the graph as amCharts cannot be used with jest
// See https://www.amcharts.com/docs/v4/getting-started/using-typescript-or-es6/#Using_amCharts_with_Jest
jest.mock('../components/Graph', () => () => <div data-testid="graph">Graph</div>);

describe('<Dashboard />', () => {
  it('should render the LoginForm', () => {
    const { getByTestId } = render(<Dashboard />);
    const graph = getByTestId('graph');
    expect(graph).toBeInTheDocument();
  });

  it("should fetch user's data", async () => {
    mockAxios.create = jest.fn(() => mockAxios);
    mockAxios.get.mockResolvedValue({ data: [] });

    const { queryAllByTestId } = render(<Dashboard />);
    await waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(1);
    });

    const savedContentCard = queryAllByTestId('content-card');
    expect(savedContentCard).toHaveLength(0);
  });
});

describe('<ContentTable />', () => {
  it(`should render ${content.length} content cards`, () => {
    const { getAllByTestId } = render(<ContentTable {...contentTableProps} />);
    const savedContentCard = getAllByTestId('content-card');
    expect(savedContentCard).toHaveLength(content.length);
  });
});
