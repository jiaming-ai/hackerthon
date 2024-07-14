import {
    Divider,
} from '@mantine/core';
import  StoryList from '@/components/StoryList/StoryList';
import { StoryCardPropsType } from '@/components/StoryCard/StoryCard';

import { ProfileCardAuthor,
    ProfileCardDataType
 } from '@/components/ProfileCard/ProfileCard';
 import { CollectionInfoPropsType, CollectionInfo } from '@/components/CollectionInfo/CollectionInfo';
 const storyData: StoryCardPropsType = 
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
const collectionData: CollectionInfoPropsType = {
    id: 1,
    name: 'plants',
    description: 'A collection of plants that I love',
    cover: 'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
}
// each user can only have one library
export default function AuthorPage({
    params:{id}}: {params:{id: string}}
) {
    console.log(id)
    return (

        <div className=''>
            <div className='sm:ml-8'>
                <CollectionInfo data={collectionData} />

            </div>
                  <Divider my="sm" />

            <div className='mt-4'>
                <StoryList dataList={Array(15).fill(storyData)} />
                
            </div>
        </div>
    );
}