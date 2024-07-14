
import ChatEditForm from '@/components/ChatEditForm/ChatEditForm';
import { Text } from '@mantine/core';
import { insertStory, getStoryById } from '@/utils/db/admin';

export default async function CreatePage({
  params
}:{params: {id: string} }) {
  const { story, error } = await getStoryById(parseInt(params.id))

  if (story && story.length > 0) {

    const storyData = story[0]
    return (
      <div className='w-full flex justify-center h-full'>
          <ChatEditForm storyData={storyData} />
      </div>
    );

  } else {
    return <div className='h-full w-full' >
      <div className='h-[calc(100vh-200px)] flex justify-center items-center'>
        <Text size='sm' c='gray'>
          Oops! The story you are looking for does not exist. <br/>Please check the URL and try again.
        </Text>
      </div>
      </div>
  }
  
}