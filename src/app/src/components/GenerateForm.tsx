import { Center, Text, SimpleGrid, FormLabel, Input, Button, Flex, Link} from '@chakra-ui/react';

import { LabelType, GenerateButton, GenerateSearch } from './typings';

const Label = ({labelText}: LabelType) => {
    return (
        <FormLabel fontSize="2xl">
            {labelText}
        </FormLabel>
    );
}

const GenButton = ({buttonText}: GenerateButton) => {
    return (
        <Link href="/dashboard">
            <Button width="165px" height="40px" _hover={{
                  bg: "#505D68",
                  color: "#D8D8D8",
                }}>{buttonText}
            </Button>
        </Link>
    );
}

const GenSearch = ({barText}: GenerateSearch) => {
    return (
        <Flex experimental_spaceX="50px">
            <GenButton buttonText="SEARCH" />
            <Input placeholder={barText} width="900px" height="40px" color="#D8D8D8" textAlign="center" backgroundColor="#424B5A"/>            
        </Flex> 
    );
}

export const GenerateForm = () => {
    return (
        <>
      
          <div style={{margin: "5% 15%"}}>
            <Center>
              <Text fontSize="5xl">Generate Content</Text>
            </Center>
    
            <Center>
              <SimpleGrid columns={1} rowGap={3} w="full">
    
                <Label labelText="offer" />

                <GenSearch barText="Open an air miles mastercard and get 5% cash back for the first 6 months!, UNIT: %, AMOUNT: 5, TYPE: CREDIT CARD" />   
    
                <Label labelText="Client Segment" />

                <GenSearch barText="INCOME RANGE: 100000, age: 25-30, location: toronto, monthly transactions: 100" />
    
                <Label labelText="Keyword Prompt" />
    
                <Input placeholder='Enter any other keywords you want to prompt the AI with' w="1020px" h="146px" color="#A1AEB7"/>      
              </SimpleGrid>
    
            </Center>        
          
          </div>
          <Flex marginLeft="51%" marginTop="8%%" experimental_spaceX="10px">
            <Label labelText="Language Type" />
            <GenButton buttonText="Friendly" />
            <GenButton buttonText="Generate" />
          </Flex>
    
          <style>{`
              
              ::placeholder {
                font-size: 12px;
                color: #D8D8D8;
              }
              
            `}</style>
        </>
      );
}