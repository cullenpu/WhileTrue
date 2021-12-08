import { useState } from 'react';

import { Button, Flex, Input, Textarea, Spacer } from '@chakra-ui/react';

interface Props {
  onSave: Function;
  displayOffer: boolean;
}

const DataInputForm = ({ onSave, displayOffer }: Props) => {
  const [offerDescription, setOfferDescription] = useState('');
  const [offerType, setOfferType] = useState('');
  const [clientSegment, setClientSegment] = useState('');

  const saveData = () => {
    if (displayOffer) {
      onSave(offerDescription, offerType);
    } else {
      onSave(clientSegment);
    }
  };

  return (
    <div>
      <Flex mb="5" wrap="wrap">
        {displayOffer ? (
          <>
            <Textarea
              placeholder="Offer Description"
              size="lg"
              maxH="250"
              width="100%"
              mb="5"
              value={offerDescription}
              data-testid="offer-description"
              onChange={(e) => setOfferDescription(e.target.value)}
            />

            <Input
              placeholder="Offer Type"
              maxWidth="75%"
              size="lg"
              value={offerType}
              data-testid="offer-type"
              onChange={(e) => setOfferType(e.target.value)}
            />
          </>
        ) : (
          <Input
            placeholder="Client Segment"
            maxWidth="85%"
            size="lg"
            value={clientSegment}
            data-testid="client-segment"
            onChange={(e) => setClientSegment(e.target.value)}
          />
        )}
        <Spacer />
        <Button variantColor="teal" size="lg" onClick={() => saveData()} data-testid="save">
          Add
        </Button>
      </Flex>
    </div>
  );
};

export default DataInputForm;
