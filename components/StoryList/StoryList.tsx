import {
  SimpleGrid,
  Group,
} from '@mantine/core';
import { StoryCard, StoryCardPropsType } from '@/components/StoryCard/StoryCard';

export default function StoryList({dataList}: {dataList: StoryCardPropsType[]}) {
  return (
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 3, xl: 4 }}
          spacing={{ base: 10, sm: 'xl' }}
          verticalSpacing={{ base: 'md', sm: 'xl' }}
          
        >
          { dataList.map((storyDataProps,index) => (
            <Group align='center' mt='lg' wrap='nowrap' key={index} justify='center'>
            <StoryCard storyDataProps={storyDataProps} />
            </Group>
          ))}
        </SimpleGrid>
  );
}

