import { X } from 'lucide-react';
import { useContext } from 'react';
import { SelectContext } from './context';
import { SelectTagProps } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('select__tag');

const Tag: React.FC<SelectTagProps> = (props) => {
  const { option } = props;
  const { handleChange } = useContext(SelectContext);

  const handleClose = () => {
    if (!option) return;
    handleChange(option);
  };

  return (
    <div className={`${clsPrefix}`}>
      <div className={`${clsPrefix}__label`}>
        {option?.label ?? option?.value}
      </div>
      <div className={`${clsPrefix}__delete`} onClick={handleClose}>
        <X />
      </div>
    </div>
  );
};

export default Tag;
