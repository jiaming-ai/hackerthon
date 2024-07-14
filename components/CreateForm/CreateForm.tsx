'use client'

import { Group, Stack, Textarea, Button, Switch, Tooltip, Select } from "@mantine/core";
import { IconFilePencil } from '@tabler/icons-react';
import { createStory } from "@/app/(withSideBar)/create/action";

export default function CreateForm() {
  return (
    <div className="w-full md:w-[500px]">
      <form action={createStory}>

        <Textarea
          leftSection={<IconFilePencil size={25} />}
          radius='lg'
          size="xl"
          minRows={5}
          name='prompt'
          maxRows={5}
          autosize
          styles={{
            section: {
              alignItems: 'start',
              paddingTop: '17px',
            }
          }}
          placeholder="Any ideas for a wonderful story..." />
          <Stack className='mt-6'>
          <Tooltip label="If on, the AI will help you refine the prompt">
            <Switch
              label="Help me refine the prompt"
              defaultChecked
              name="parsePrompt"
            />
          </Tooltip>
        <Select
          label="Story Type"
          data={[{
            value: 'PictureBookConcept',
            label: 'Concept Learning with Picture Book'
          }]}
          defaultValue={'PictureBookConcept'}
          name="storyType"
        />

        <Select
          label="Age"
          data={[
            {
              value: '0-1',
              label: 'Baby'
            },
            {
              value: '1-3',
              label: 'Toddler'
            },
            {
              value: '3-5',
              label: 'Preschooler'
            },
            {
              value: '6-12',
              label: 'School Age'
            },
          ]}
          defaultValue={'1-3'}
          name="age"
        />


          </Stack>


        {/* <Group className="mt-6">
          <Button
            type="button"
            variant="outline"
            radius="lg"
            size="xs"
          >
            Themes
          </Button>
          <Button
            type="button"
            size="xs"
            variant="outline"
            radius="lg"
          >
            Gendre
          </Button>
          <Button
            type="button"
            size="xs"
            variant="outline"
            radius="lg"
          >
            Advanced
          </Button>
        </Group> */}

        <Button
          variant="light"
          radius="lg"
          size="md"
          fullWidth
          className="mt-6"
          type="submit"
        >
          Create
        </Button>
      </form>
    </div>
  );
}