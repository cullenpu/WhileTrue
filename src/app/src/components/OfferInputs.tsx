import { Button, Flex, Input, Spacer, Textarea } from '@chakra-ui/react';
import { useState } from 'react';

interface Props {
  onOfferSave: Function;
}

const OfferInputs = ({ onOfferSave }: Props) => {
  const [offerDescription, setOfferDescription] = useState('');
  const [offerType, setOfferType] = useState('');

  return (
    <div>
      <Flex mb="5">
        <Textarea
          placeholder="Offer Description"
          size="lg"
          maxH="250"
          value={offerDescription}
          onChange={(e) => setOfferDescription(e.target.value)}
          data-testid="offer-description"
        />
      </Flex>
      <Flex mb="5">
        <Input
          placeholder="Offer Type"
          maxWidth="75%"
          size="lg"
          value={offerType}
          onChange={(e) => setOfferType(e.target.value)}
          data-testid="offer-type"
        />
        <Spacer />
        <Button size="lg" onClick={() => onOfferSave(offerDescription, offerType)} data-testid="save">
          Add
        </Button>
      </Flex>
    </div>
  );
};

export default OfferInputs;
