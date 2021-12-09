import { Box, Center, Heading, Spinner, Tab, TabList, TabPanel, TabPanels, Tabs } from '@chakra-ui/react';
import * as React from 'react';
import { getData, postData } from '../api/data';
import DataInputForm from '../components/DataInputForm';
import DataTable from '../components/DataTable';

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
              {isLoading ? (
                <Center>
                  <Spinner />
                </Center>
              ) : (
                <DataTable columns={{ offer: 'Description', type: 'Type' }} data={offers} />
              )}
            </TabPanel>
            <TabPanel>
              <DataInputForm onSave={saveClientSegment} displayOffer={false} />
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
