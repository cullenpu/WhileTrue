import { Table, Thead, Tbody, Tr, Th, Td } from '@chakra-ui/react';

interface Props {
  columns: { [key: string]: string };
  data: Array<{ [key: string]: string }>;
}

const DataTable = ({ columns, data }: Props) => {
  console.log(columns);
  console.log(data);
  return (
    <div>
      <Table variant="simple">
        <Thead>
          <Tr>
            {Object.values(columns).map((column) => {
              return <Th key={column}>{column}</Th>;
            })}
          </Tr>
        </Thead>
        <Tbody>
          {data.map((row) => (
            <Tr>
              {Object.keys(columns).map((key) => {
                return <Td key={key}>{row[key]}</Td>;
              })}
            </Tr>
          ))}
        </Tbody>
      </Table>
    </div>
  );
};

export default DataTable;
