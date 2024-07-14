
import { Paper, Text, Title, Button } from '@mantine/core';
import classes from './CollectionCard.module.css';

const data = {
  category: 'Nature',
  title: 'Favorate Plants',
  cover_image: 'https://images.unsplash.com/photo-1477554193778-9562c28588c0?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80',
  id: 1,
};
export function CollectionCard() {
  return (
    <Paper shadow="md" p="xl" radius="md" className={classes.card}>
      <div>
        <Text className={classes.category} size="xs">
          Nature
        </Text>
        <Title order={3} className={classes.title}>
          Favorate Plants
        </Title>
      </div>
      <Button variant="outline" color="white" component='a' href='/collection/1'>
       View Collection 
      </Button>
    </Paper>
  );
}
