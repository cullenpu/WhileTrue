import * as React from 'react';
import { Center, Text } from '@chakra-ui/react';

import createAxiosInstance from '../api/axios';
import { GenerateContent } from '../components/typings';
import GeneratedContentTable from '../components/GeneratedContentTable';

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
      <GeneratedContentTable content={generateContent} />
    </div>
  );
  }