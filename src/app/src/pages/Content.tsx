import { Center, Heading } from '@chakra-ui/react';
import * as React from 'react';
import GeneratedContentTable from '../components/GeneratedContentTable';
import { MainButton } from '../components/MainButton';
import { ContentCard } from '../components/typings';

export const Content = (props: { generatedContent: ContentCard[] }) => {
  const { generatedContent } = props;

  return (
    <div>
      <Center m="10">
        <Heading>PERSONALIZED CONTENT</Heading>
      </Center>
      <div style={{ margin: '5% 10%' }}>
        <MainButton buttonText="BACK" hrefText="/generate" />
      </div>
      <GeneratedContentTable content={generatedContent} />
    </div>
  );
};
