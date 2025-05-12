import { Timeline, TimelineItem } from 'lessline';

interface MyTimelineItem extends TimelineItem {
  date: string;
}

const items: MyTimelineItem[] = [
  {
    key: '1',
    title: 'Created "Preline in React" task',
    content: 'Find more detailed insctructions here.',
    date: '2025-05-12',
  },
  {
    key: '2',
    title: 'Release v5.2.0 quick bug fix 🐞',
    content: 'Verify your email to get started.',
    date: '2025-05-12',
  },
  {
    key: '3',
    title: 'Marked "Install Charts" completed',
    content: 'Finally! You can check it out here.',
    date: '2025-05-13',
  },
  {
    key: '4',
    title: 'Take a break ⛳️',
    content: 'Just chill for now... 😉',
    date: '2025-05-13',
  },
];

const Group: React.FC = () => {
  return (
    <section>
      <Timeline items={items} groupBy={(item) => item.date} />
    </section>
  );
};

export default Group;
