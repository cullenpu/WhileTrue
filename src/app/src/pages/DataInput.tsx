import { Box, Center, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import * as React from 'react';
import { getClientSegments, getOffers, postClientSegment, postOffer } from '../api/data';
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
      setOffers(await getOffers());
      setClientSegments(await getClientSegments());
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getDataFromApi();
  }, []);

  const saveOffer = async (offerDescription: string, offerType: string) => {
    await postOffer(offerDescription, offerType);
    getDataFromApi();
  };

  const saveClientSegment = async (clientSegment: string) => {
    await postClientSegment(clientSegment);
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
