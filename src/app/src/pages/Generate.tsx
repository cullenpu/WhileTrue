import { Box, Button, Center, Flex, FormLabel, Heading, Input, SimpleGrid, Spacer } from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { searchDataByModel } from '../api/generateContent';
import GenContentSearchBar from '../components/GenContentSearchBar';
import { MainButton } from '../components/MainButton';

const searchboxes = (
  data: { display: string; placeholder: string; dataId: React.Dispatch<React.SetStateAction<number>>; model: string }[],
) => {
  return data.map((item) => (
    <Box>
      <FormLabel fontSize="2xl">{item.display}</FormLabel>
      <GenContentSearchBar
        placeholder={item.placeholder}
        setDataId={item.dataId}
        model={item.model}
        searchFunc={searchDataByModel}
      />
    </Box>
  ));
};

export const Generate = () => {
  const [offerId, setOfferId] = useState(-1);
  const [clientSegmentId, setClientSegmentId] = useState(-1);
  const [keywords, setKeywords] = useState('');
  const [languageType, setLanguageType] = useState('Friendly');

  useEffect(() => {
    document.title = 'Create - WhileTrue';
  }, []);

  const displayBoxes = [
    {
      display: 'Offer',
      placeholder: 'Search for an offer here',
      dataId: setOfferId,
      model: 'offers',
    },
    {
      display: 'Client Segment',
      placeholder: 'Search for an client segment here',
      dataId: setClientSegmentId,
      model: 'clients',
    },
  ];

  return (
    <div>
      <div style={{ margin: '0 15% 40px 15%' }}>
        <Center mt="10" mb="10">
          <header>
            <Heading id="main">Create Copy</Heading>
          </header>
        </Center>

        <Center>
          <SimpleGrid columns={1} rowGap={8} w="full">
            {searchboxes(displayBoxes)}

            <Box>
              <FormLabel fontSize="2xl">Key Words</FormLabel>
              <Input
                placeholder="Enter any other keywords you want to prompt the AI with"
                h="146px"
                color="#A1AEB7"
                onChange={(e) => {
                  setKeywords(e.target.value);
                }}
              />
            </Box>
          </SimpleGrid>
        </Center>
      </div>
      <Flex margin="0 15%" experimental_spaceX="10px">
        {/* <FormLabel fontSize="2xl">Language Type</FormLabel>
        <MainButton
          buttonText={languageType}
          onClickHandler={(e) => {
            e.preventDefault();
            setLanguageType(languageType === 'Friendly' ? 'Professional' : 'Friendly');
          }}
        /> */}
        <Spacer />
        {offerId !== -1 && clientSegmentId !== -1 ? (
          <Link to={{ pathname: '/content', state: { offerId, clientSegmentId, keywords } }}>
            <MainButton buttonText="Generate" />
          </Link>
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
