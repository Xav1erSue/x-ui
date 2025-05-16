import InternalRadioGroup from './group';
import InternalRadio from './radio';

const Radio: typeof InternalRadio & {
  Group: typeof InternalRadioGroup;
} = InternalRadio as any;

Radio.Group = InternalRadioGroup;

export { Radio };

export * from './types';
