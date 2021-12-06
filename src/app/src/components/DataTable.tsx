import { Table, Tbody, Td, Th, Thead, Tr } from '@chakra-ui/react';

interface Props {
  columns: { [key: string]: string };
  data: Array<{ [key: string]: string }>;
}

const DataTable = ({ columns, data }: Props) => {
  return (
    <div data-testid="data-table">
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
            <Tr key={row.id} data-testid="data-table-row">
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
