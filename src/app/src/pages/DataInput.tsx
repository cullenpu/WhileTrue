import * as React from 'react';
import { Box, Tabs, TabList, TabPanels, Tab, TabPanel, Center, Text } from '@chakra-ui/react';

export const DataInput = () => {
  return (
    <div>
      <Center>
        <Text fontSize="5xl">Data Input</Text>
      </Center>

      <Box maxW="75%" mx="auto">
        <Tabs isFitted>
          <TabList>
            <Tab _selected={{ color: 'white', bg: 'lime.400' }}>Offer</Tab>
            <Tab _selected={{ color: 'white', bg: 'lime.400' }}>Customer Segment</Tab>
          </TabList>

          <TabPanels>
            <TabPanel>
              <p>one!</p>
            </TabPanel>
            <TabPanel>
              <p>two!</p>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </div>
  );
};
