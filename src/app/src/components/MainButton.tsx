import { Button } from '@chakra-ui/react';
import { MainButtonAttr } from './typings';

export const MainButton = ({ buttonText, onClickHandler }: MainButtonAttr) => {
  return (
    <Button width="165px" height="40px" onClick={onClickHandler}>
      {buttonText}
    </Button>
  );
};
