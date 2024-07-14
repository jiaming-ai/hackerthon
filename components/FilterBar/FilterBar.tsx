import {
    Group,
    Badge,
} from '@mantine/core';

const data = [
    "Earth",
    "Eating Habits",
    "Sleep",
    "Numbers",
]
export default function FilterBar() {
    return (
        <Group justify='start'>
            {data.map((item) => ( 
                <Badge w="fit-content" variant="outline" component='a' href='#' key={item} className='cursor-pointer'>
                    {item}
                </Badge>
            ))
            }
        </Group>
    );
}