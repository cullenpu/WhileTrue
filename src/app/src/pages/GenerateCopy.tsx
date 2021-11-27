import { Button, Center, Flex, FormLabel, Input, Link, SimpleGrid, Text } from '@chakra-ui/react';
// import { ReactChild, ReactFragment, ReactPortal } from 'react';
import { GenerateButton, GenerateSearch } from '../components/typings';

const GenButton = ({ buttonText, hrefText }: GenerateButton) => {
  return (
    <Link href={hrefText}>
      <Button
        width="165px"
        height="40px"
        _hover={{
          bg: '#505D68',
          color: '#D8D8D8',
        }}
      >
        {buttonText}
      </Button>
    </Link>
  );
};

const GenSearch = ({ barText }: GenerateSearch) => {
  return (
    <Flex experimental_spaceX="50px">
      <GenButton buttonText="SEARCH" hrefText="/Dashboard" />
      <Input
        placeholder={barText}
        width="900px"
        height="40px"
        color="#D8D8D8"
        textAlign="center"
        backgroundColor="#424B5A"
      />
    </Flex>
  );
};

export const GenerateCopy = () => {
  return (
    <div>
      <div style={{ margin: '5% 15%' }}>
        <Center>
          <Text fontSize="5xl">Generate Content</Text>
        </Center>

        <Center>
          <SimpleGrid columns={1} rowGap={3} w="full">
            <FormLabel fontSize="2xl">Offer</FormLabel>
            <GenSearch barText="Search for an offer here" />

            <FormLabel fontSize="2xl">Client Segment</FormLabel>
            <GenSearch barText="Search for a client segment here" />

            <FormLabel fontSize="2xl">Keyword Prompt</FormLabel>
            <Input
              placeholder="Enter any other keywords you want to prompt the AI with"
              w="1020px"
              h="146px"
              color="#A1AEB7"
            />
          </SimpleGrid>
        </Center>
      </div>
      <Flex marginLeft="51%" marginTop="8%%" experimental_spaceX="10px">
        <FormLabel fontSize="2xl">Language Type</FormLabel>
        <GenButton buttonText="Friendly" hrefText="/Content" />
        <GenButton buttonText="Generate" hrefText="/Content" />
      </Flex>

      <style>
        {`::placeholder {
          font-size: 12px;
          color: #D8D8D8;
        }`}
      </style>
    </div>
  );
};
