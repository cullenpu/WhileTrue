import { Center, Grid, Box, Text } from '@chakra-ui/layout';
import { ContentType } from './typings';

const SavedContentCard = ({ contentTitle, contentText }: ContentType) => {
  return (
    <Box border="1px" borderColor="gray.200">
      <Text fontSize="md">{contentTitle}</Text>
      <Text fontSize="md">{contentText}</Text>
    </Box>
  );
};

const SavedContentTable = (props: { content: ContentType[] }) => {
  const { content } = props;
  return (
    <div>
      <h1>Saved Content</h1>
      <Center width="80%">
        <Grid width="100%">
          {content.map((c) => (
            <div>
              <SavedContentCard contentTitle={c.contentTitle} contentText={c.contentText} />
            </div>
          ))}
        </Grid>
      </Center>
    </div>
  );
};

export default SavedContentTable;
