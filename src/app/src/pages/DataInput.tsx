import { Box, Center, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import * as React from 'react';
import { getData, postData } from '../api/data';
import ClientSegmentInputs from '../components/ClientSegmentInputs';
import DataTable from '../components/DataTable';
import OfferInputs from '../components/OfferInputs';

export const DataInput = () => {
  const [isLoading, setLoading] = React.useState(true);
  const [offers, setOffers] = React.useState([]);
  const [clientSegments, setClientSegments] = React.useState([]);

  const getDataFromApi = async () => {
    try {
      setLoading(true);
      setOffers(await getData('offers'));
      setClientSegments(await getData('clients'));
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
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

  return (
    <div>
      <Center m="10">
        <Heading>DATA INPUT</Heading>
      </Center>

      <Box maxW="75%" mx="auto">
        <Tabs isFitted>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>OFFER</Tab>
            <Tab _selected={{ color: 'white', bg: 'blue.500' }}>CUSTOMER SEGMENT</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <OfferInputs onOfferSave={saveOffer} />
              {isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <DataTable columns={{ offer: 'Description', type: 'Type' }} data={offers} />
              )}
            </TabPanel>
            <TabPanel>
              <ClientSegmentInputs onClientSegmentSave={saveClientSegment} />
              {isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <DataTable columns={{ segment: 'Client Segment' }} data={clientSegments} />
              )}
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};
