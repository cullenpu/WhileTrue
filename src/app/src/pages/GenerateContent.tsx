import * as React from 'react';
import { Center, Text, Button, Link } from '@chakra-ui/react';

import createAxiosInstance from '../api/axios';
import { GenerateContent, GenerateButton } from '../components/typings';
import GeneratedContentTable from '../components/GeneratedContentTable';

const GenButton = ({buttonText, hrefText}: GenerateButton) => {
    return (
        <Link href={hrefText}>
            <Button width="165px" height="40px" _hover={{
                  bg: "#505D68",
                  color: "#D8D8D8",
                }}>{buttonText}
            </Button>
        </Link>
    );
}

const getContent = async (setContent: { (value: React.SetStateAction<GenerateContent[]>): void; (arg0: never): void; }) => {
    const instance = createAxiosInstance();
    const generateContent = await instance.get('/Content');
    setContent(generateContent.data);
  };

export const Content = () => {
    
    const [generateContent, setgenerateContent] = React.useState<GenerateContent[]>([]);
    React.useEffect(() => {
        try {
        getContent(setgenerateContent);
        } catch (err) {
        console.log(err);
        }
    }, []);

  return (
    <div>
      <Center>
        <Text fontSize="5xl">Generate Content</Text>
      </Center>
      <div style={{margin: "5% 10%"}}>
        <GenButton buttonText="BACK" hrefText='/Generate' />
      </div>
      
      <GeneratedContentTable content={generateContent} />
    </div>
  );
  }