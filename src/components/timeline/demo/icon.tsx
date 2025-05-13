import { Timeline, type TimelineItem, Typography } from 'lessline';
import { CircleDot, GitCommitHorizontal, GitPullRequest } from 'lucide-react';

const items: TimelineItem[] = [
  {
    key: '1',
    icon: <GitCommitHorizontal size={18} />,
    title: 'Create 11 commits in 1 repository',
    content: (
      <>
        <div>• Xav1erSue/lessline</div>
        <div>• Xav1erSue/vitepress-demo-plugin</div>
        <div>• Xav1erSue/vitepress-plugin-react-docgen</div>
      </>
    ),
    time: '12:15 PM',
  },
  {
    key: '2',
    icon: <CircleDot size={18} color="#357D37" />,
    title: 'Opened 11 issues in 1 repository',
    content: <div>• Xav1erSue/lessline - 11 issues</div>,
    time: '12:15 PM',
  },
  {
    key: '3',
    icon: <GitPullRequest size={18} color="#7F54DE" />,
    title: 'Created a pull request in alibaba/hooks that received 1 comment',
    content: (
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <Typography component="div" size="base" weight="semibold">
          feat(useClickAway): 新增options透传addEventListener
        </Typography>
        <Typography component="div" size="sm">
          [中文版模板 / Chinese template] 🤔 This is a ... New feature Bug fix
          Site / documentation update Demo update TypeScript definition update
          Bundle s…
        </Typography>
      </div>
    ),
    time: '12:15 PM',
  },
];

const Demo: React.FC = () => {
  return <Timeline items={items} showTime />;
};

export default Demo;
