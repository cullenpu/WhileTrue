import { Box, Center, Grid, Text } from '@chakra-ui/layout';
import { Input } from '@chakra-ui/react';
import { ContentCard } from './typings';

const SavedContentCard = ({ contentTitle, contentBody }: ContentCard) => {
  return (
    <Box mb="20px" p="30px" border="1px" borderRadius="3%" borderColor="gray.200">
      <Text fontSize="lg" mb="30px">
        {contentTitle}
      </Text>
      <Text fontSize="sm">{contentBody}</Text>
    </Box>
  );
};

const SavedContentTable = (props: { content: ContentCard[] }) => {
  const { content } = props;
  return (
    <div style={{ margin: '5% 10%' }}>
      <Grid templateColumns="repeat(2, 1fr)" width="100%" gap="50%">
        <Text fontSize="3xl">Saved Content</Text>
        <Input placeholder="Search" />
      </Grid>

      <Center>
        <Grid width="100%">
          {content.map((c) => (
            <div>
              <SavedContentCard contentTitle={c.contentTitle} contentBody={c.contentBody} />
            </div>
          ))}
        </Grid>
      </Center>
    </div>
  );
};

export default SavedContentTable;
