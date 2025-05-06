import { useMemo, } from "react";
import { OptionType, SelectProps } from "../types";


interface UseSearchOptionsProps {
  inputValue?: string;
  dataSource?: OptionType[];
  filterOption: SelectProps['filterOption'];
}

export const useSearchOptions = (props: UseSearchOptionsProps) => {
  const { inputValue = '', dataSource, filterOption } = props;

  const options = useMemo(() => {
    return dataSource?.filter((option) => {
      if (!filterOption) return true
      else if (typeof filterOption === 'function') return filterOption(inputValue, option)
      else return option.label?.includes(inputValue)
    }) ?? []
  }, [dataSource, inputValue, filterOption])

  return {
    options,
  }
};
