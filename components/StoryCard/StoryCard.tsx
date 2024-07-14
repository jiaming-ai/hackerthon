'use client'

import {
    Card,
    Image,
    ActionIcon,
    Group,
    Text,
    Avatar,
    Badge,
    useMantineTheme,
    rem,
} from '@mantine/core';
import { IconHeart, IconBookmark, IconShare } from '@tabler/icons-react';
import classes from './StoryCard.module.css';

export interface StoryCardPropsType {
    title: string;
    badges: string[];
    avatar: string;
    link: string;
    image: string;
    id: string;
    author: string;
    user_id: string;
}

export function StoryCard({storyDataProps}: {storyDataProps: StoryCardPropsType}) {
    const theme = useMantineTheme();

    return (
        <Card withBorder padding="lg" radius="md" className={classes.card}>
            <Card.Section mb="sm">
                <a href={storyDataProps.link}>
                <Image
                    src={storyDataProps.image}
                    className={classes.image}
                    alt={storyDataProps.title}
                />
                </a>
            </Card.Section>
            <Group>
                {storyDataProps.badges.map((badge) => (
                    <Badge w="fit-content" variant="light" key={badge}>
                        {badge}
                    </Badge>
                ))}

            </Group>

            <Group align='center' mt='lg' wrap='nowrap'>
                <Avatar
                    src={storyDataProps.avatar}
                    radius="sm"
                    component='a'
                    href={`/user/${storyDataProps.user_id}`}
                />
                <Text component='a' href={storyDataProps.link}
                className={classes.title} lineClamp={2} size='sm'>

                    {storyDataProps.title}
                </Text>
            </Group>

            <Card.Section className={classes.footer}>

                <Group justify="space-between">
                    <Text size='sm' c='dimmed' fz='xs'>{storyDataProps.author}</Text>
                    <Group gap={0}>
                        <ActionIcon variant="subtle" color="gray">
                            <IconHeart
                                style={{ width: rem(20), height: rem(20) }}
                                color={theme.colors.red[6]}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray">
                            <IconBookmark
                                style={{ width: rem(20), height: rem(20) }}
                                color={theme.colors.yellow[6]}
                                stroke={1.5}
                            />
                        </ActionIcon>
                        <ActionIcon variant="subtle" color="gray">
                            <IconShare
                                style={{ width: rem(20), height: rem(20) }}
                                color={theme.colors.blue[6]}
                                stroke={1.5}
                            />
                        </ActionIcon>
                    </Group>
                </Group>
            </Card.Section>
        </Card>
    );
}