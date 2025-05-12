import { Timeline, type TimelineItem, Typography } from 'lessline';
import { CircleDot, GitCommitHorizontal, GitPullRequest } from 'lucide-react';

const items: TimelineItem[] = [
  {
    key: '1',
    dot: <GitCommitHorizontal size={14} />,
    title: 'Create 11 commits in 1 repository',
    content: (
      <ul>
        <li>Xav1erSue/lessline</li>
        <li>Xav1erSue/vitepress-demo-plugin</li>
        <li> Xav1erSue/vitepress-plugin-react-docgen</li>
      </ul>
    ),
    time: '12:15 PM',
  },
  {
    key: '2',
    dot: <CircleDot size={14} />,
    title: 'Opened 11 issues in 1 repository',
    content: (
      <ul>
        <li>Xav1erSue/lessline - 11 issues</li>
      </ul>
    ),
    time: '12:15 PM',
  },
  {
    key: '3',
    dot: <GitPullRequest size={14} />,
    title: 'Created a pull request in alibaba/hooks that received 1 comment',
    content: (
      <div
        style={{
          border: '1px solid #e5e7eb',
          borderRadius: 8,
          padding: 12,
        }}
      >
        <Typography.Text size="base" weight="semibold">
          feat(useClickAway): 新增options透传addEventListener
        </Typography.Text>
        <br />
        <Typography.Text size="sm">
          [中文版模板 / Chinese template] 🤔 This is a ... New feature Bug fix
          Site / documentation update Demo update TypeScript definition update
          Bundle s…
        </Typography.Text>
      </div>
    ),
    time: '12:15 PM',
  },
];

const Dot: React.FC = () => {
  return (
    <section>
      <Timeline items={items} showTime />
    </section>
  );
};

export default Dot;
