import cn from 'classnames';
import { motion, AnimatePresence } from 'motion/react';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import Option from './option';
import { OptionListProps } from './types';
import { getClsPrefix } from '../../utils';

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
          onMouseDown={(e) => e.preventDefault()}
          {...rest}
        >
          {options.length ? (
            options.map((option, index) => (
              <Option key={option.value} option={option} index={index} />
            ))
          ) : (
            <div className={`${clsPrefix}__empty`}>暂无数据</div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body,
  );
});

export default OptionList;
