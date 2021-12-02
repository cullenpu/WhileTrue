import React from 'react';
import Select from 'react-select';
import { GenerateSearchBar } from './typings';

const GenContentSearchBar = ({ placeholder, setDataId, model, searchFunc }: GenerateSearchBar) => {
  const [searchResults, setSearchReslts] = React.useState<any[]>([]);

  React.useEffect(() => {
    searchFunc(model, '').then((res: any) => {
      let data = [];
      if (model === 'offers') {
        data = res.map((item: any) => {
          return {
            label: item.offer,
            value: item.id,
          };
        });
      } else if (model === 'clients') {
        data = res.map((item: any) => {
          return {
            label: item.segment,
            value: item.id,
          };
        });
      }
      console.log(model, data);
      setSearchReslts(data);
    });
  }, []);

  const handleChange = (selectedOption: any) => {
    setDataId(selectedOption.value);
  };

  return (
    // <Flex experimental_spaceX="50px">
    // <MainButton buttonText="SEARCH" hrefText="/Dashboard" />
    <div style={{ width: '100%' }}>
      <Select
        placeholder={placeholder}
        options={searchResults}
        onChange={handleChange}
        styles={{
          control: (base, _) => ({
            ...base,
            '&:hover': { borderColor: '#47ADE4' }, // border style on hover
            border: '1px solid lightgray', // default border color
          }),
        }}
      />
    </div>
    // </Flex>
  );
};

export default GenContentSearchBar;
