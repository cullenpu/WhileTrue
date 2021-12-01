import { Button, Center, Flex, FormLabel, Heading, Input, SimpleGrid, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { generateContent, searchDataByModel } from '../api/generateContent';
import GenContentSearchBar from '../components/GenContentSearchBar';
import { MainButton } from '../components/MainButton';

export const Generate = () => {
  const [offerId, setOfferId] = useState(-1);
  const [clientSegmentId, setClientSegmentId] = useState(-1);
  const [keywords, setKeywords] = useState('');
  const [languageType, setLanguageType] = useState('Friendly');

  return (
    <div>
      <div style={{ margin: '0 15% 40px 15%' }}>
        <Center m="10">
          <Heading>GENERATE CONTENT</Heading>
        </Center>

        <Center>
          <SimpleGrid columns={1} rowGap={3} w="full">
            <FormLabel fontSize="2xl">Offer</FormLabel>
            <GenContentSearchBar
              placeholder="Search for an offer here"
              setDataId={setOfferId}
              model="offers"
              searchFunc={searchDataByModel}
            />

            <FormLabel fontSize="2xl">Client Segment</FormLabel>
            <GenContentSearchBar
              placeholder="Search for a client segment here"
              setDataId={setClientSegmentId}
              model="clients"
              searchFunc={searchDataByModel}
            />

            <FormLabel fontSize="2xl">Keyword Prompt</FormLabel>
            <Input
              placeholder="Enter any other keywords you want to prompt the AI with"
              h="146px"
              color="#A1AEB7"
              onChange={(e) => {
                setKeywords(e.target.value);
              }}
            />
          </SimpleGrid>
        </Center>
      </div>
      <Flex margin="0 15%" experimental_spaceX="10px">
        <FormLabel fontSize="2xl">Language Type</FormLabel>
        <MainButton
          buttonText={languageType}
          onClickHandler={(e) => {
            e.preventDefault();
            setLanguageType(languageType === 'Friendly' ? 'Professional' : 'Friendly');
          }}
        />
        <Spacer />
        {offerId !== -1 && clientSegmentId !== -1 ? (
          <MainButton
            buttonText="Generate"
            onClickHandler={(e) => {
              e.preventDefault();
              generateContent(offerId, clientSegmentId, keywords);
            }}
            hrefText="/content"
          />
        ) : (
          <Button width="165px" height="40px" isDisabled>
            Select Data
          </Button>
        )}
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
