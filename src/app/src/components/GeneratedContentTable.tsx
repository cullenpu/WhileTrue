import { useState } from 'react';
import { Center, Grid, Box, Text} from '@chakra-ui/layout';
import { Button, Flex } from '@chakra-ui/react';
import { GenerateContent } from './typings';

function HandleSave(setbuttonText: Function, buttonText: string){
    if (buttonText === "save"){
        setbuttonText("unsave");
    } else{
        setbuttonText("save");
    }
};

const SaveButton = () => {
    const [buttonText, setbuttonText] = useState('save');
    return (
        <Button onClick={() => HandleSave(setbuttonText, buttonText)}>{buttonText}</Button>
    );
};

const SavedContentCard = ({ contentText }: GenerateContent) => {
    return (
      <Box mb="20px" p="30px" border="1px" borderRadius="3%" borderColor="gray.200">
          <Flex>
              <Text fontSize="sm" w="90%">{contentText}</Text>
              <SaveButton />
          </Flex>
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