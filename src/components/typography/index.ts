import Link from './link';
import Paragraph from './paragraph';
import Text from './text';
import Title from './title';
import InternalTypography from './typography';
export * from './types';

type Typography = typeof InternalTypography & {
  Title: typeof Title;
  Text: typeof Text;
  Paragraph: typeof Paragraph;
  Link: typeof Link;
};

export const Typography = InternalTypography as Typography;

Typography.Title = Title;
Typography.Text = Text;
Typography.Paragraph = Paragraph;
Typography.Link = Link;
