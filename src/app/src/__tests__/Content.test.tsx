import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import GeneratedContentTable from '../components/GeneratedContentTable';
import { Content } from '../pages/Content';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

jest.mock('react-router', () => ({
  ...jest.requireActual('react-router'),
  useLocation: () => ({
    state: {
      offerId: 1,
      clientSegmentId: 1,
      keywords: 'keywords',
    },
  }),
}));

describe('<Content />', () => {
  it('should make a call to the backend to generate content', async () => {
    mockAxios.create = jest.fn(() => mockAxios);
    mockAxios.post.mockResolvedValue({ data: [] });

    render(<Content />);
    await waitFor(() => {
      expect(mockAxios.post).toHaveBeenCalledTimes(1);
    });
  });
});

describe('<GeneratedContentTable />', () => {
  it('should display generated content', () => {
    const content = [
      { clientSegmentId: '1', contentBody: 'content1', offerId: '1', seed: 'seed1', time: '1' },
      { clientSegmentId: '2', contentBody: 'content2', offerId: '2', seed: 'seed2', time: '2' },
    ];
    const contentTableProps = {
      content,
    };
    const { getAllByTestId } = render(<GeneratedContentTable {...contentTableProps} />);
    const genContentCard = getAllByTestId('gen-content-card');
    expect(genContentCard.length).toBe(content.length);
  });
});
