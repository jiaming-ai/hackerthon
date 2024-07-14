import { Stack, Text, Group } from '@mantine/core';

export interface CollectionInfoPropsType {
    id: number,
    name: string,
    description: string,
    cover: string,
}

export function CollectionInfo({data}: {data: CollectionInfoPropsType}) {
    return (
        <Group className=''>
            <img src={data.cover} className='w-24 h-24 rounded-xl' />
            <Stack gap='xs'>
                <Text size='xl'>{data.name}</Text>
                <Text size='sm'>{data.description}</Text>
            </Stack>
        </Group>
    )
}