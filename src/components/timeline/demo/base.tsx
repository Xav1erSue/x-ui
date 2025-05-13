import { Timeline, TimelineItem } from 'lessline';

const items: TimelineItem[] = [
  {
    key: '1',
    title: 'Created "Preline in React" task',
    content: 'Find more detailed insctructions here.',
  },
  {
    key: '2',
    title: 'Release v5.2.0 quick bug fix 🐞',
    content: 'Verify your email to get started.',
  },
  {
    key: '3',
    title: 'Marked "Install Charts" completed',
    content: 'Finally! You can check it out here.',
  },
  {
    key: '4',
    title: 'Take a break ⛳️',
    content: 'Just chill for now... 😉',
  },
];

const Demo: React.FC = () => {
  return <Timeline items={items} />;
};

export default Demo;
