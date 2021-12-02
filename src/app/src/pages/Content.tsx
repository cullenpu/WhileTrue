import { Center, Heading, Link } from '@chakra-ui/react';
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
        <Heading>PERSONALIZED CONTENT</Heading>
      </Center>
      <div style={{ margin: '5% 10%' }}>
        <Link href="/generate">
          <MainButton
            buttonText="BACK"
            // onClickHandler={(e) => {
            //   e.preventDefault();
            //   setGeneratedContent([]);
            // }}
          />
        </Link>
      </div>
      <GeneratedContentTable content={generatedContent} />
    </div>
  );
};
