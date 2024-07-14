'use client'

import {
  HoverCard,
  Group,
  Button,
  UnstyledButton,
  Text,
  SimpleGrid,
  ThemeIcon,
  Anchor,
  Divider,
  Center,
  Box,
  Burger,
  Drawer,
  Collapse,
  ScrollArea,
  rem,
  useMantineTheme,
  TextInput,
} from '@mantine/core';
import Link from 'next/link';

import { useDisclosure } from '@mantine/hooks';
import {
  IconSquareRoundedPlus,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';
import { Image } from '@mantine/core';
import { useWindowScroll } from '@mantine/hooks';
import { usePathname } from 'next/navigation'
import { Avatar, Menu } from '@mantine/core';
import { IconLogout, IconUserCircle, IconChecklist, IconSettings, IconMoodSearch } from '@tabler/icons-react';
import { logout } from '@/app/(withSideBar)/login/actions';
import { useRouter } from 'next/navigation';

export function UserNavbar({ userName }: { userName: string | null }) {

  if (userName === null) {
    const router = useRouter()
    router.push('/login')
    
  }
  return (
    <Box className='pr-8'>
      <header className={classes.header}>
        <Group justify="space-between" h="100%">
          {/* start of bar */}
          <Group className={classes.logo}>
            <Link href="/">
              <Image
                radius="md"
                h={50}
                w="auto"
                fit="contain"
                src="/branding/logo.png"
                alt="fablette"
              />

            </Link>
          </Group>

          {/* mid of bar */}
          <Group className='w-48 lg:w-96'>
            <TextInput placeholder="Search" radius='xl'  
            className='w-full'
            rightSection={<IconMoodSearch size={18} />}
            >

            </TextInput>
          </Group>

          {/* end of bar */}
          <Group>

            {userName ?
              <Group>
             
                <Menu shadow='md' trigger="click-hover" openDelay={100} closeDelay={400}>
                  <Menu.Target>
                    <Avatar color="cyan" radius="xl">{userName.slice(0, 1)}</Avatar>
                  </Menu.Target>
                  <Menu.Dropdown>

                    <Menu.Item component='a' href='/tasks/finished' leftSection={<IconChecklist style={{ width: rem(14), height: rem(14) }} />}>
                      Tasks
                    </Menu.Item>
                    <Menu.Item leftSection={<IconSettings style={{ width: rem(14), height: rem(14) }} />}>
                      Settings
                    </Menu.Item>
                    <Menu.Divider />
                    <Menu.Item leftSection={<IconUserCircle style={{ width: rem(14), height: rem(14) }} />}>
                      Profile
                    </Menu.Item>
                    <Menu.Item onClick={async () => { await logout() }} leftSection={<IconLogout style={{ width: rem(14), height: rem(14) }} />}>
                      Logout
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>
              </Group>
              :
              <Group>
                <Button
                  variant="outline"
                  // leftSection={<IconSquareRoundedPlus size={18} />}
                  gradient={{ from: 'blue', to: 'cyan', deg: 90 }}
                  component={Link}
                  radius={15}
                  visibleFrom='sm'
                  href="/login">Login
                </Button>
              </Group>
            }
          </Group>
        </Group>
      </header>
    </Box>
  );
}