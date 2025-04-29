import { createPortal } from 'react-dom';
import { getClsPrefix } from '../../utils';
import { forwardRef } from 'react';
import { OptionListProps } from './types';
import Option from './option';
import { motion, AnimatePresence } from 'motion/react';
import cn from 'classnames';

const clsPrefix = getClsPrefix('select__option-list');

const OptionList = forwardRef<HTMLDivElement, OptionListProps>((props, ref) => {
  const { visible, options, className, ...rest } = props;

  return createPortal(
    <AnimatePresence>
      {visible && (
        <motion.div
          className={cn(`${clsPrefix}`, className)}
          ref={ref}
          role="listbox"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.1 }}
          {...rest}
        >
          {options?.map((option, index) => (
            <Option key={option.value} option={option} index={index} />
          ))}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});

export default OptionList;
