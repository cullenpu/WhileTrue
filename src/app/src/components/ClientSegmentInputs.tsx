import { Button, Flex, Input, Spacer } from '@chakra-ui/react';
import { useState } from 'react';

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
          data-testid="client-segment"
        />
        <Spacer />
        <Button size="lg" onClick={() => onClientSegmentSave(clientSegment)} data-testid="save">
          Add
        </Button>
      </Flex>
    </div>
  );
};

export default ClientSegmentInputs;
