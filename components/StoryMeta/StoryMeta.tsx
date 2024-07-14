import { Avatar,
    Group,
    Stack,
    Text,
    Divider,
    Box,
 } from "@mantine/core"
 import { StoryBookDataType } from "../StoryBook/StoryBook"
import { IconEyeCheck, IconHeart } from "@tabler/icons-react"
import { Tables } from "@/supabase/database.types"

export default function StoryMeta({ storyDataFake, storyData }: { storyDataFake: StoryBookDataType, storyData: Tables<'story'> }) {
    return (
        <Stack align="start" justify='flex-start' gap='xs'>

            <Text fz="h2" fw={600} c="black">{storyData.title}</Text>
            <Text fz="md" fw={500} c="gray">{storyDataFake.metadata.description}</Text>
            <Group align="center" gap='xl' className="w-full">
                <Group align="center" gap='xs'>
                <Text>{storyDataFake.metadata.view_count} </Text>
                <IconEyeCheck size={17}/>
                </Group>
                <Group align="center" gap='xs'>
                <Text fz="sm" fw={500}>{storyDataFake.metadata.like_count}</Text>
                <IconHeart size={17}/>
                </Group>
            </Group>
            <Divider c='gray' variant="solid" className="w-full mt-1"/>

            <Group align="center" className="mt-4">
                <Avatar size="lg" src={storyDataFake.metadata.avatar} alt={storyDataFake.metadata.author} />
                <Stack justify="flex-start" align="start" gap='xs'>
                    <Text fz="sm" fw={700} c="black">{storyDataFake.metadata.author}</Text>
                    <Text fz="sm" fw={500} c="gray">{storyDataFake.metadata.author_description}</Text>
                    
                </Stack>
            </Group>
            {/* <Divider c='gray' variant="solid" className="w-full"/> */}

            {/* <Box className="mt-12">
                <Text size="sm">
                    {storyData.pages_text[0]}
                </Text>
            </Box> */}
        </Stack>
    )
}