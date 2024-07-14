import {
  SimpleGrid,
  Group,
} from '@mantine/core';
import { StoryCardPropsType } from '@/components/StoryCard/StoryCard';
import StoryList from '@/components/StoryList/StoryList';
import FilterBar from '@/components/FilterBar/FilterBar';

const data: StoryCardPropsType = 
  {
    title: 'Top 50 underrated plants for house decoration',
    badges: ['Earth', 'Concept'],
    avatar: 'https://raw.githubusercontent.com/mantinedev/mantine/master/.demo/avatars/avatar-7.png',
    link: '/book/1',
    author: 'Elsa Gardenowl',
    id: '1',
    image: 'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
    user_id: '1',
  };

const dataList = Array(15).fill(data);


export default function HomePage() {
  return (
    <div className=''>
      <FilterBar />
      <div className='mt-4'>
        <StoryList dataList={dataList} />
      </div>
    </div>
  );
}
