import { Center, Grid, Box, Text } from '@chakra-ui/layout';
import { GenerateContent } from './typings';

const SavedContentCard = ({ contentText }: GenerateContent) => {
  return (
    <Box mb="20px" p="30px" border="1px" borderRadius="3%" borderColor="gray.200">
      <Text fontSize="sm">{contentText}</Text>
    </Box>
  );
};

const GeneratedContentTable = (props: { content: GenerateContent[] }) => {
  const { content } = props;
  return (
    <div style={{margin: "5% 10%"}}>
      <Center>
        <Grid width="100%">
          {content.map((c) => (
            <div>
              <SavedContentCard contentText={c.contentText} />
            </div>
          ))}
        </Grid>
      </Center>
    </div>
  );
};

export default GeneratedContentTable;