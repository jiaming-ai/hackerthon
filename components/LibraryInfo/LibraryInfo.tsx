

import {
    Avatar,
    Group,
    Stack,
    Text,
} from '@mantine/core';


export function LibraryInfo() {

    return (
        <Group className='ml-12'>
            <Avatar
                src="https://unsplash.com/photos/11GZVrMzfUU/download?ixid=M3wxMjA3fDB8MXxzZWFyY2h8MTB8fGtpZHxlbnwwfHx8fDE3MTk5OTg3MDV8MA&force=true&w=640"
                alt="Elsa Gardenowl"
                radius="60px"
                size="120px"
            />

            <Stack className='ml-6' >
                <Stack align='start'>
                <Text size="xl" fw={600}>
                    Susan
                </Text>
                <Text size="xs" c="gray">
                    Loves everything about plants
                </Text>
                </Stack>

                <Text size="sm" >
                    Read 12 books in the pask week.
                </Text>
            </Stack>

        </Group>

    )
    }