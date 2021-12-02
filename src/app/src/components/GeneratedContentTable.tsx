import { Box, Center, Grid, Text } from '@chakra-ui/layout';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { postData } from '../api/data';
import { ContentCard } from './typings';

function handleSave(setButtonText: Function, buttonText: string, contentTitle: string, contentBody: string) {
  if (buttonText === 'Save') {
    postData('content', { contentTitle, contentBody });
    setButtonText('Unsave');
  } else {
    setButtonText('Save');
  }
}

const GeneratedContentCard = ({ contentTitle, contentBody }: ContentCard) => {
  const [buttonText, setButtonText] = useState('Save');
  return (
    <Box mb="20px" p="30px" border="1px" borderRadius="3%" borderColor="gray.200">
      <Text fontSize="lg" mb="30px">
        {contentTitle}
      </Text>
      <Text fontSize="sm">{contentBody}</Text>
      <Button onClick={() => handleSave(setButtonText, buttonText, contentTitle, contentBody)}>{buttonText}</Button>
    </Box>
  );
};

const GeneratedContentTable = (props: { content: ContentCard[] }) => {
  const { content } = props;
  return (
    <div style={{ margin: '5% 10%' }}>
      <Center>
        <Grid width="100%">
          {content.map((c) => (
            <div>
              <GeneratedContentCard contentTitle={c.contentTitle} contentBody={c.contentBody} />
            </div>
          ))}
        </Grid>
      </Center>
    </div>
  );
};

export default GeneratedContentTable;
