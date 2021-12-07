import { render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import GeneratedContentTable from '../components/GeneratedContentTable';
import { Generate } from '../pages/Generate';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('<Generate />', () => {
  it('should display offer and client segment search bars and fetch backend data', () => {
    const { getAllByTestId } = render(<Generate />);
    const genSearchBar = getAllByTestId('gen-search-bar');
    waitFor(() => {
      expect(genSearchBar).toHaveLength(2);
    });
  });

  it('should fetch offer and client segment data to populate search bars', () => {
    mockAxios.create = jest.fn(() => mockAxios);
    mockAxios.get.mockResolvedValue({ data: [] });

    const { queryAllByTestId } = render(<Generate />);
    waitFor(() => {
      mockAxios.create = jest.fn(() => mockAxios);
      mockAxios.get.mockResolvedValue({ data: [] });
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });
  });
});

describe('<GeneratedContentTable />', () => {
  it('should display generated content', () => {
    const content = [
      { clientSegmentId: '1', contentBody: 'content1', offerId: '1', seed: 'seed1' },
      { clientSegmentId: '2', contentBody: 'content2', offerId: '2', seed: 'seed2' },
    ];
    const contentTableProps = {
      content,
    };
    const { getAllByTestId } = render(<GeneratedContentTable {...contentTableProps} />);
    const genContentCard = getAllByTestId('gen-content-card');
    expect(genContentCard.length).toBe(content.length);
  });
});
