import cn from 'classnames';
import React from 'react';
import { TimelineItem, TimelineProps } from './types';
import { getClsPrefix } from '../../utils';
import { Typography } from '../typography';

const clsPrefix = getClsPrefix('timeline');

const Timeline = <T extends TimelineItem>(
  props: TimelineProps<T>,
): React.ReactElement => {
  const { className, items, groupBy, showTime, ...rest } = props;

  return (
    <div className={cn(clsPrefix, className)} {...rest}>
      {items?.map((item, index) => {
        const previousItem = index > 0 ? items[index - 1] : null;

        const previousGroupName =
          groupBy && previousItem ? groupBy(previousItem) : null;
        const currentGroupName = groupBy ? groupBy(item) : null;

        const isSame = previousGroupName === currentGroupName;

        return (
          <React.Fragment key={item.key}>
            {!isSame && currentGroupName ? (
              <Typography
                component="div"
                size="xs"
                weight="semibold"
                className={cn(`${clsPrefix}__group-name`)}
              >
                {currentGroupName}
              </Typography>
            ) : null}
            <div className={cn(`${clsPrefix}__item`)}>
              {/* 时间文案 */}
              {showTime ? (
                <Typography
                  component="div"
                  size="sm"
                  weight="medium"
                  className={cn(`${clsPrefix}__item__time`)}
                >
                  {item.time}
                </Typography>
              ) : null}
              {/* 时间轴 */}
              <div className={cn(`${clsPrefix}__item__left`)}>
                <div
                  className={cn(`${clsPrefix}__item__dot-container`, {
                    [`${clsPrefix}__item__dot-container--custom`]: !!item.dot,
                  })}
                >
                  {item.dot || (
                    <div className={cn(`${clsPrefix}__item__dot`)} />
                  )}
                </div>
                <div className={cn(`${clsPrefix}__item__line`)} />
              </div>
              {/* 时间轴内容 */}
              <div className={cn(`${clsPrefix}__item__right`)}>
                <Typography
                  component="div"
                  weight="semibold"
                  className={cn(`${clsPrefix}__item__title`)}
                >
                  {item.title}
                </Typography>
                <Typography
                  component="div"
                  weight="medium"
                  className={cn(`${clsPrefix}__item__content`)}
                >
                  {item.content}
                </Typography>
              </div>
            </div>
          </React.Fragment>
        );
      })}
    </div>
  );
};

export default Timeline;
