import { Center, Text } from '@chakra-ui/react';
import * as React from 'react';
import createAxiosInstance from '../api/axios';
import GeneratedContentTable from '../components/GeneratedContentTable';
import { MainButton } from '../components/MainButton';
import { GenerateContent } from '../components/typings';

const getContent = async (setContent: {
  (value: React.SetStateAction<GenerateContent[]>): void;
  (arg0: never): void;
}) => {
  const instance = createAxiosInstance();
  const generateContent = await instance.get('/content');
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
        <Text fontSize="5xl">Personalized Content</Text>
      </Center>
      <div style={{ margin: '5% 10%' }}>
        <MainButton buttonText="BACK" hrefText="/generate" />
      </div>

      <GeneratedContentTable content={generateContent} />
    </div>
  );
};
