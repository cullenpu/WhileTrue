import { Center, Heading } from '@chakra-ui/react';
import * as React from 'react';
import { getData } from '../api/data';
import SavedContentTable from '../components/SavedContentTable';
import Graph from '../components/Graph';
import { ContentCard } from '../components/typings';

export const Dashboard = () => {
  const [content, setContent] = React.useState<ContentCard[]>([]);

  const getContentFromApi = async () => {
    try {
      setContent(await getData('content'));
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    getContentFromApi();
  }, []);

  return (
    <div>
      <Center m="10">
        <Heading>Dashboard</Heading>
      </Center>
      <SavedContentTable content={content} />
      <Graph />
    </div>
  );
};
