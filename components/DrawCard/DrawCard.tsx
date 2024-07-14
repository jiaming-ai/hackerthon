
import { Card, Box, Image, Group, Text, LoadingOverlay } from "@mantine/core";

export interface DrawCardProps {
    image: string;
    text: string;
    pageNumber: number;
    isDrawing: boolean;
}
export function DrawCard({ props }: { props: DrawCardProps }) {
    return (
        <Card shadow="sm" padding="xs" radius="md" withBorder>
            <Card.Section>
                <Box pos='relative'>
                    <LoadingOverlay visible={props.isDrawing} />
                    {
                        props.isDrawing ?
                            <Box className="h-[300px] w-full flex items-center justify-center">
                                <Text size="xs" c="dimmed">Drawing...</Text>
                            </Box> :

                            <Image
                                src={props.image}
                                height={300}
                                alt={props.text}
                            />
                    }
                </Box>

            </Card.Section>
            <Text size="sm" c="dimmed" className="mt-2">
                {props.text}
            </Text>
            <Group justify='center'>
                <Text size="xs" c="dimmed">
                    ({props.pageNumber})
                </Text>
            </Group>

        </Card>
    )
}