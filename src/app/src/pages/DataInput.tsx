import { Box, Center, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import * as React from 'react';
import { getData, postData } from '../api/data';
import DataInputForm from '../components/DataInputForm';
import DataTable from '../components/DataTable';

export const DataInput = () => {
  const [offerSuccess, setOfferSuccess] = React.useState(true);
  const [clientSuccess, setClientSuccess] = React.useState(true);
  const [isLoading, setLoading] = React.useState(true);
  const [offers, setOffers] = React.useState([]);
  const [clientSegments, setClientSegments] = React.useState([]);

  const getDataFromApi = async () => {
    setLoading(true);
    try {
      setOffers(await getData('offers'));
    } catch (err) {
      console.log(err);
      setOfferSuccess(false);
    }
    try {
      setClientSegments(await getData('clients'));
    } catch (err) {
      console.log(err);
      setClientSuccess(false);
    }
    setLoading(false);
  };

  React.useEffect(() => {
    document.title = 'Data Input - WhileTrue';
    getDataFromApi();
  }, []);

  const saveOffer = async (offer: string, type: string) => {
    await postData('offers', { offer, type });
    getDataFromApi();
  };

  const saveClientSegment = async (segment: string) => {
    await postData('clients', { segment });
    getDataFromApi();
  };

  const OfferDataTable = () => {
    return isLoading ? (
      <Center>
        <Spinner />
      </Center>
    ) : (
      <DataTable columns={{ offer: 'Description', type: 'Type' }} data={offers} />
    );
  };

  const ClientSegmentDataTable = () => {
    return isLoading ? (
      <Center>
        <Spinner />
      </Center>
    ) : (
      <DataTable columns={{ segment: 'Client Segment' }} data={clientSegments} />
    );
  };

  return (
    <div>
      <Center m="10">
        <header>
          <Heading id="main">Data Input</Heading>
        </header>
      </Center>

      <Box maxW="75%" mx="auto">
        <Tabs isFitted>
          <TabList mx="auto" maxW="75%">
            <Tab _selected={{ color: 'white', bg: 'blue.500', borderRadius: '5' }} fontWeight="bold">
              Offer
            </Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500', borderRadius: '5' }} fontWeight="bold">
              Customer Segment
            </Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <DataInputForm onSave={saveOffer} displayOffer />
              {offerSuccess ? <OfferDataTable /> : <Center>Error fetching offer data</Center>}
            </TabPanel>
            <TabPanel>
              <DataInputForm onSave={saveClientSegment} displayOffer={false} />
              {clientSuccess ? <ClientSegmentDataTable /> : <Center>Error fetching client segment data</Center>}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};
