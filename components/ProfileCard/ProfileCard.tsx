
import { Avatar, Box, Group, Stack, Text } from '@mantine/core'

export interface ProfileCardDataType {
    "name": string,
    "description": string,
    "avatar"?: string,
    "user_id": string,
    "location"?: string,
    "create_count"?: number,
    "read_count"?: number,
    "total_book_count"?: number,
    "collection_count"?: number,
}

export function ProfileCard({ profileData }: { profileData: ProfileCardDataType }) {
    return (
        <Stack align="center" gap='xs'>
            <Group align="center" gap='xs'>
                <Avatar size="lg" src={profileData.avatar} alt={profileData.name} />
                <Text fz="sm" fw={700} c="black">{profileData.name}</Text>
            </Group>
            <Text fz="md" fw={500} c="gray">{profileData.description}</Text>
        </Stack>
    )
}

export function ProfileCardAuthor({ profileData }: { profileData: ProfileCardDataType }) {
    return (
        <Group>
            <Box>
                <Avatar size="xl" src={profileData.avatar} alt={profileData.name} />
            </Box>
            <Stack gap="xs" className='ml-4 sm:ml-12'>
                <Text fz="xl" fw={600} c="black">{profileData.name}</Text>
                <Text fz="sm" c="gray">{profileData.description}</Text>
                <Text fz="sm" c="gray">Created {profileData.create_count} fantastic stories.</Text>
                {profileData.location && <Text fz="sm" c="gray">Lives in {profileData.location}</Text>}
            </Stack>
        </Group>
    )
}
export function ProfileCardLibrary({ profileData }: { profileData: ProfileCardDataType }) {
    return (
        <Group>
            <Box>
                <Avatar size="xl" src={profileData.avatar} alt={profileData.name} />
            </Box>
            <Stack gap="xs" className='ml-4 sm:ml-12'>
                <Text fz="xl" fw={600} c="black">{profileData.name}</Text>
                <Text fz="sm" c="gray">{profileData.description}</Text>
                <Text fz="sm" c="gray">{profileData.total_book_count} book in {profileData.collection_count} collections.</Text>
            </Stack>
        </Group>
    )
}