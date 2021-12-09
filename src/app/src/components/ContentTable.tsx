import { Box, Center, Grid, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import qs from 'qs';
import { postData } from '../api/data';
import { ContentCard } from './typings';

function handleSave(
  setButtonText: Function,
  buttonText: string,
  contentBody: string,
  offerId: number,
  clientSegmentId: number,
  seed?: string,
) {
  if (buttonText === 'Save') {
    postData('content', { seed, contentBody, offerId, clientSegmentId });
    setButtonText('Saved');
  }
}

const ContentCardComponent = ({
  seed,
  contentBody,
  offerId,
  clientSegmentId,
  enableSaving,
  offer,
  clientSegment,
}: ContentCard) => {
  const [buttonText, setButtonText] = useState('Save');
  return (
    <Box mb="20px" p="30px" border="1px" borderRadius="5" borderColor="blue.500" data-testid="content-card">
      <Text fontSize="lg" mb="30px">
        {contentBody}
      </Text>
      <Text fontSize="md" mb="30px">
        Prompt: {seed}
      </Text>
      {enableSaving ? (
        <Button onClick={() => handleSave(setButtonText, buttonText, contentBody, offerId, clientSegmentId, seed)}>
          {buttonText}
        </Button>
      ) : (
        <>
          <Text fontSize="md" mb="30px">
            Offer: {offer}
          </Text>
          <Text fontSize="md" mb="30px">
            Client Segment: {clientSegment}
          </Text>
        </>
      )}
    </Box>
  );
};

interface Props {
  content: ContentCard[];
  enableSaving: boolean;
  contentOffers?: never[];
  contentClientSegments?: never[];
}

const ContentTable = ({ content, enableSaving, contentOffers = [], contentClientSegments = [] }: Props) => {
  return (
    <div style={{ margin: '5% 10%' }} data-testid="content-table">
      <Center>
        <Grid width="100%">
          {content.map((c, i) => (
            <div key={c.contentBody}>
              <ContentCardComponent
                seed={c.seed}
                contentBody={c.contentBody}
                time={c.time}
                offerId={c.offerId}
                clientSegmentId={c.clientSegmentId}
                enableSaving={enableSaving}
                offer={!enableSaving ? c.offer : undefined}
                clientSegment={!enableSaving ? c.clientSegment : undefined}
              />
            </div>
          ))}
        </Grid>
      </Center>
    </div>
  );
};

export default ContentTable;
