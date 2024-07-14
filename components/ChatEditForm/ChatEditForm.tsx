
'use client'

import { Group, Textarea, Button, ScrollArea, Title, Text, Divider } from "@mantine/core";
import { IconFilePencil, IconPlayerPlay, IconDeviceFloppy,IconScribble, IconEdit,IconRotate} from '@tabler/icons-react';
import { useState } from "react";
import EdiText from 'react-editext';
import { Database, Tables, TablesInsert, TablesUpdate } from '@/supabase/database.types';
import { updateStoryAction } from "@/app/(withSideBar)/create/action";

import classes  from './ChatEditForm.module.css';

export default function ChatEditForm({storyData}:{storyData: Tables<'story'>}) {
  const [story, setStory] = useState(storyData);

  function handleSave() {
    updateStoryAction(story).then(() => {
      console.log('Story updated')
    })
  }

  const editProps = {
    hint: "Press Enter to confirm changes",
    editOnViewClick: true,
    cancelOnEscape: true,
    submitOnUnfocus: true,
    containerProps: {
      className: classes.container
    },
    editButtonProps: {
      className: classes.buttonContainer
    },
    editButtonContent: <IconEdit size={25} />,
  }

  return (
    <div className="w-full md:w-[600px]">
      <ScrollArea className='h-[calc(100vh-300px)]' type="auto">
      <Text className={classes.title}>
        Title:
      </Text>
      <EdiText type="text" value={story.title} onSave={(value) => setStory({...story, title: value})} {...editProps} />
      <Divider className="mb-4 w-11/12" />
      {
        story.pages_text?.map((page, index) => (
          <div key={index} className="mb-4">
            <Text className={classes.title}>
              Page {index + 1}:
            </Text>

            <EdiText type="textarea" value={page} onSave={(value) => {
              const newPages = [...story.pages_text]
              newPages[index] = value
              setStory({...story, pages_text: newPages})
            }} 
            {...editProps}
            />
          </div>
        ))
      }
     
        </ScrollArea>

      
      <Group justify="center" className="h-[80px]">
        <Button 
        size="md" 
        variant="light" 
        leftSection={<IconDeviceFloppy size={20} />}
        onClick={handleSave}
        >
          Save
        </Button>

        <Button 
        size="md" 
        variant="light" 
        component="a"
        href={`/draw/${story.id}`}
        leftSection={<IconScribble size={20} />}
        >
          Draw pictures!
        </Button>

      </Group>
      <Textarea 
    //   leftSection={<IconFilePencil size={25} />}
      rightSection={<Button size="xs" variant="light" className=""><IconRotate size={15} /></Button>}
      radius='lg'
      size="xl"
      styles={{
        input: {
          height: '100px'
        },
        root: {
            marginTop: '20px'
        }
      }}

      placeholder="Any ideas for a wonderful story..." />
    </div>
  );
}