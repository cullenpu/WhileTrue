import { fireEvent, render, waitFor } from '@testing-library/react';
import axios from 'axios';
import React from 'react';
import DataInputForm from '../components/DataInputForm';
import DataTable from '../components/DataTable';
import OfferInputs from '../components/OfferInputs';
import { DataInput } from '../pages/DataInput';

jest.mock('axios');
const mockAxios = axios as jest.Mocked<typeof axios>;

describe('<DataInput />', () => {
  it('should display empty offer and client segment inputs', () => {
    const { getByTestId } = render(<DataInput />);
    const offerDescription = getByTestId('offer-description');
    expect(offerDescription).toHaveValue('');
    const offerType = getByTestId('offer-type');
    expect(offerType).toHaveValue('');

    const clientSegment = getByTestId('client-segment');
    expect(clientSegment).toHaveValue('');
  });

  it('should fetch and have empty offer and client segment data tables', () => {
    mockAxios.create = jest.fn(() => mockAxios);
    mockAxios.get.mockResolvedValue({ data: [] });

    const { queryAllByTestId } = render(<DataInput />);
    waitFor(() => {
      expect(mockAxios.get).toHaveBeenCalledTimes(2);
    });

    const dataTable = queryAllByTestId('data-table');
    expect(dataTable).toHaveLength(0);
  });
});

describe('<OfferInputs />', () => {
  const onOfferSave = jest.fn();
  const offerInputsProps = {
    onOfferSave,
  };

  it('should save offers using input forms', () => {
    const { getByTestId } = render(<OfferInputs {...offerInputsProps} />);
    const offerDescription = getByTestId('offer-description');
    const offerType = getByTestId('offer-type');
    const save = getByTestId('save');
    fireEvent.change(offerDescription, { target: { value: 'test-description' } });
    fireEvent.change(offerType, { target: { value: 'test-type' } });
    fireEvent.click(save);
    expect(onOfferSave).toHaveBeenCalledWith('test-description', 'test-type');
  });
});

describe('<DataInputForms /> for clientSegment', () => {
  const onClientSegmentSave = jest.fn();
  const clientSegmentInputsProps = {
    onSave: onClientSegmentSave,
    displayOffer: false,
  };

  it('should save client segments using input forms', () => {
    const { getByTestId } = render(<DataInputForm {...clientSegmentInputsProps} />);
    const clientSegment = getByTestId('client-segment');
    const save = getByTestId('save');
    fireEvent.change(clientSegment, { target: { value: 'test-client-segment' } });
    fireEvent.click(save);
    expect(onClientSegmentSave).toHaveBeenCalledWith('test-client-segment');
  });
});

describe('<DataInputForms /> for offers', () => {
  const onOfferSave = jest.fn();
  const offerInputsProps = {
    onSave: onOfferSave,
    displayOffer: true,
  };

  it('should save client segments using input forms', () => {
    const { getByTestId } = render(<DataInputForm {...offerInputsProps} />);
    const offerDescription = getByTestId('offer-description');
    const offerType = getByTestId('offer-type');
    const save = getByTestId('save');
    fireEvent.change(offerDescription, { target: { value: 'offer-description' } });
    fireEvent.change(offerType, { target: { value: 'offer-type' } });
    fireEvent.click(save);
    expect(onOfferSave).toHaveBeenCalledWith('offer-description', 'offer-type');
  });
});

describe('<DataTable />', () => {
  it('should display offer data', () => {
    const columns = { offer: 'Description', type: 'Type' };
    const data = [{ id: '0', offer: 'offer0', type: 'type0', userId: '0' }];
    const offerTableProps = {
      columns,
      data,
    };
    const { getAllByTestId } = render(<DataTable {...offerTableProps} />);
    const dataTableRow = getAllByTestId('data-table-row');
    expect(dataTableRow).toHaveLength(data.length);
  });

  it('should display client segment data', () => {
    const columns = { segment: 'Client Segment' };
    const data = [
      { id: '1', segment: 'segment1', userId: '1' },
      { id: '2', segment: 'segment2', userId: '2' },
      { id: '3', segment: 'segment3', userId: '3' },
    ];
    const clientTableProps = {
      columns,
      data,
    };
    const { getAllByTestId } = render(<DataTable {...clientTableProps} />);
    const dataTableRow = getAllByTestId('data-table-row');
    expect(dataTableRow).toHaveLength(data.length);
  });
});
