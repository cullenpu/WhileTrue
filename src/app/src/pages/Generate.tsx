import { Button, Center, Flex, FormLabel, Heading, Input, SimpleGrid, Spacer } from '@chakra-ui/react';
import { useState } from 'react';
import { MainButton } from '../components/MainButton';
import { GenerateSearchBar } from '../components/typings';

const GenSearch = ({ barText, onChangeHandler }: GenerateSearchBar) => {
  return (
    <Flex experimental_spaceX="50px">
      <MainButton buttonText="SEARCH" hrefText="/Dashboard" />
      <Input
        onChange={onChangeHandler}
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

const generateContent = async (offer: string, clientSegment: string, languageType: string) => {
  console.log(offer, clientSegment, languageType);


  
  // TODO: use GPT-3 API to generate personalized content



};

export const Generate = () => {
  const [offer, setOffer] = useState('');
  const [clientSegment, setClientSegment] = useState('');
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
            <GenSearch
              barText="Search for an offer here"
              onChangeHandler={(e) => {
                setOffer(e.target.value);
              }}
            />

            <FormLabel fontSize="2xl">Client Segment</FormLabel>
            <GenSearch
              barText="Search for a client segment here"
              onChangeHandler={(e) => {
                setClientSegment(e.target.value);
              }}
            />

            <FormLabel fontSize="2xl">Keyword Prompt</FormLabel>
            <Input placeholder="Enter any other keywords you want to prompt the AI with" h="146px" color="#A1AEB7" />
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
        {offer && clientSegment ? (
          <MainButton
            buttonText="Generate"
            onClickHandler={(e) => {
              e.preventDefault();
              generateContent(offer, clientSegment, languageType);
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
