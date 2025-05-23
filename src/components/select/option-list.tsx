import cn from 'classnames';
import { forwardRef } from 'react';
import { createPortal } from 'react-dom';
import { CSSTransition } from 'react-transition-group';
import Option from './option';
import { OptionListProps } from './types';
import { getClsPrefix } from '../../utils';

const clsPrefix = getClsPrefix('select__option-list');

const OptionList = forwardRef<HTMLDivElement, OptionListProps>((props, ref) => {
  const { visible, options, className, ...rest } = props;

  return createPortal(
    <CSSTransition
      in={visible}
      timeout={100}
      classNames={{
        enter: `${clsPrefix}--enter`,
        enterActive: `${clsPrefix}--enter-active`,
        exit: `${clsPrefix}--exit`,
        exitActive: `${clsPrefix}--exit-active`,
      }}
      unmountOnExit
    >
      <div
        className={cn(`${clsPrefix}`, className)}
        ref={ref}
        role="listbox"
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
      </div>
    </CSSTransition>,
    document.body,
  );
});

export default OptionList;
