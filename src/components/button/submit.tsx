import { useState } from 'react';
import Button from './button';
import { SubmitProps } from './types';

const Submit: React.FC<SubmitProps> = (props) => {
  const [loading, setLoading] = useState(false);
  const { onClick, ...rest } = props;

  const handleClick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
    if (onClick && typeof onClick === 'function') {
      try {
        setLoading(true);
        await onClick(e);
      } finally {
        setLoading(false);
      }
    }
  };

  return <Button {...rest} onClick={handleClick} loading={loading} />;
};

export default Submit;
