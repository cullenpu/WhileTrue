import { Center, Grid, Box, Text } from '@chakra-ui/layout';
import { ContentType } from './typings';

const SavedContentCard = ({ contentTitle, contentText }: ContentType) => {
  return (
    <Box mb="20px" p="30px" border="1px" borderRadius="3%" borderColor="gray.200">
      <Text fontSize="lg" mb="30px">{contentTitle}</Text>
      <Text fontSize="sm">{contentText}</Text>
    </Box>
  );
};

const SavedContentTable = (props: { content: ContentType[] }) => {
  const { content } = props;
  return (
    <div style={{margin: "5% 10%"}}>
      <Text fontSize="3xl">Saved Content</Text>
      <Center>
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
