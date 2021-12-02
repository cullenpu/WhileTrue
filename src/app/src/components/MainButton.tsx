import { Button } from '@chakra-ui/react';
import { MainButtonAttr } from './typings';

export const MainButton = ({ buttonText, onClickHandler }: MainButtonAttr) => {
  return (
      <Button
        width="165px"
        height="40px"
        _hover={{
          bg: '#505D68',
          color: '#D8D8D8',
        }}
        onClick={onClickHandler}
      >
        {buttonText}
      </Button>
  );
};
