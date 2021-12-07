import { Box, Center, Grid, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import { ContentCard } from './typings';

const SavedContentCard = ({ contentTitle, contentBody, time }: ContentCard) => {
  return (
    <Box mb="20px" p="30px" border="1px" borderRadius="5" borderColor="blue.500" data-testid="saved-content-card">
      <Text fontSize="lg" m="20px">
        {contentBody}
      </Text>
    </Box>
  );
};

const SavedContentTable = (props: { content: ContentCard[] }) => {
  const { content } = props;
  return (
    <div style={{ margin: '5% 10%' }} data-testid="saved-content-table">
      <Grid templateColumns="repeat(2, 1fr)" width="100%" gap="50%" mb="30px">
        <Text fontSize="3xl">Saved Content</Text>
        {/* <Input placeholder="Search" /> */}
      </Grid>

      <Center>
        <Grid width="100%">
          {content.map((c) => (
            <div key={c.contentBody}>
              <SavedContentCard contentTitle={c.contentTitle} contentBody={c.contentBody} time={c.time} />
            </div>
          ))}
        </Grid>
      </Center>
    </div>
  );
};

export default SavedContentTable;
