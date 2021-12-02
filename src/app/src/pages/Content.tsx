import { Center, Heading, Link, Spinner } from '@chakra-ui/react';
import * as React from 'react';
import { useLocation } from 'react-router';
import { generateContent } from '../api/generateContent';
import GeneratedContentTable from '../components/GeneratedContentTable';
import { MainButton } from '../components/MainButton';
import { ContentCard } from '../components/typings';

interface CustomizedState {
  offerId: number;
  clientSegmentId: number;
  keywords: string;
}

export const Content = () => {
  const [generatedContent, setGeneratedContent] = React.useState<ContentCard[]>([]);
  const location = useLocation();
  const state = location.state as CustomizedState;
  const { offerId, clientSegmentId, keywords } = state;

  const generateContentUsingParams = async () => {
    setGeneratedContent(await generateContent(offerId, clientSegmentId, keywords));
  };

  React.useEffect(() => {
    try {
      generateContentUsingParams();
    } catch (err) {
      console.log(err);
    }
  }, []);

  return (
    <div>
      <Center m="10">
        <Heading>Personalized Content</Heading>
      </Center>
      <div style={{ margin: '0 0 0 10%' }}>
        <Link href="/generate">
          <MainButton buttonText="BACK" />
        </Link>
      </div>
      {generatedContent.length === 0 ? (
        <Spinner style={{ margin: '20% 50%' }} />
      ) : (
        <GeneratedContentTable content={generatedContent} />
      )}
    </div>
  );
};
