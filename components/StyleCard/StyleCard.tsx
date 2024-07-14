import { IconEye, IconMessageCircle } from '@tabler/icons-react';
import { Card, Text, Group, Center, rem, useMantineTheme } from '@mantine/core';
import classes from './StyleCard.module.css';

export function StyleCard() {
  const theme = useMantineTheme();

  return (
    <Card
      p="lg"
      shadow="lg"
      className={classes.card}
      radius="md"
      component="a"
      href="#"
    >
      <div
        className={classes.image}
        style={{
          backgroundImage:
            'url(/assets/style.jpg)',
        }}
      />
      <div className={classes.overlay} />

      <div className={classes.content}>
        <div>
          <Text size="lg" className={classes.title} fw={500}>
            Animi Pro
          </Text>

        </div>
      </div>
    </Card>
  );
}