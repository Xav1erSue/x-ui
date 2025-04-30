import { useMemo, useState } from "react";
import { OptionType, SelectProps } from "../types";


interface UseSearchOptionsProps {
  dataSource?: OptionType[];
  filterOption: SelectProps['filterOption'];
}

export const useSearchOptions = (props: UseSearchOptionsProps) => {
  const { dataSource, filterOption } = props;
  const [search, setSearch] = useState('');

  const options = useMemo(() => {
    return dataSource?.filter((option) => {
      if (!filterOption) return true
      else if (typeof filterOption === 'function') return filterOption(search, option)
      else return option.label?.includes(search)
    }) ?? []
  }, [dataSource, search, filterOption])

  return {
    options,
    search,
    setSearch,
  }
};
