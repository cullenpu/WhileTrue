import React, { useRef } from 'react';
import Select from 'react-select';
import { GenerateSearchBar } from './typings';

const GenContentSearchBar = ({ placeholder, setDataId, model, searchFunc }: GenerateSearchBar) => {
  const [searchResults, setSearchReslts] = React.useState<any[]>([]);
  const isRendered = useRef<boolean>(false);

  const fetchSearchBarDataFromApi = async () => {
    try {
      const res = await searchFunc(model, '');
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
      setSearchReslts(data);
    } catch (err) {
      console.log(err);
    }
  };

  React.useEffect(() => {
    isRendered.current = true;
    fetchSearchBarDataFromApi();
    return () => {
      isRendered.current = false;
    };
  }, []);

  const handleChange = (selectedOption: any) => {
    setDataId(selectedOption.value);
  };

  return (
    <div style={{ width: '100%' }} data-testid="gen-search-bar">
      <Select
        placeholder={placeholder}
        options={searchResults}
        onChange={handleChange}
        data-testid="gen-search-bar"
        styles={{
          control: (base, _) => ({
            ...base,
            '&:hover': { borderColor: '#47ADE4' }, // border style on hover
            border: '1px solid lightgray', // default border color
          }),
        }}
      />
    </div>
  );
};

export default GenContentSearchBar;
