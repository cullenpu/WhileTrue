import * as React from 'react';
import { Center, Text } from '@chakra-ui/react';

import createAxiosInstance from '../api/axios';
import SavedContentTable from '../components/SavedContentTable';
import { ContentType } from '../components/typings';

const getContent = async (setContent: { (value: React.SetStateAction<ContentType[]>): void; (arg0: never): void; }) => {
  const instance = createAxiosInstance();
  const content = await instance.get('/dashboard/content');
  setContent(content.data);
};

export const Dashboard = () => {
  const [content, setContent] = React.useState<ContentType[]>([]);
  React.useEffect(() => {
    try {
      getContent(setContent);
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Center>
        <Text fontSize="5xl">Dashboard</Text>
      </Center>
      <SavedContentTable content={content} />
    </div>
  );
};
