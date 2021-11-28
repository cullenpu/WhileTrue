import { useState } from 'react';

import { Button, Flex, Input, Spacer } from '@chakra-ui/react';

interface Props {
  onClientSegmentSave: Function;
}

const ClientSegmentInputs = ({ onClientSegmentSave }: Props) => {
  const [clientSegment, setClientSegment] = useState('');

  return (
    <div>
      <Flex mb="5">
        <Input
          placeholder="Client Segment"
          maxWidth="85%"
          size="lg"
          value={clientSegment}
          onChange={(e) => setClientSegment(e.target.value)}
        />
        <Spacer />
        <Button variantColor="teal" size="lg" onClick={() => onClientSegmentSave(clientSegment)}>
          Add
        </Button>
      </Flex>
    </div>
  );
};

export default ClientSegmentInputs;
