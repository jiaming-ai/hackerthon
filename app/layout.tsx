
import '@/styles/main.css';
import '@mantine/core/styles.css';
import React from 'react';
import { MantineProvider, ColorSchemeScript } from '@mantine/core';
import { theme } from '../theme';
import { Notifications } from '@mantine/notifications';
import { UserNavbar } from "@/components/Navbar/Navbar";
import { getUser } from "@/utils/auth/authServer";

export const metadata = {
  title: 'fablette',
  description: 'Create stories freely with AI.',
};

export default async function RootLayout({ children }: { children: any }) {
  const user = await getUser();
  let userName
  if (!user) {
    userName = null
  } else {
    userName = user.email as string
  }

  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width, user-scalable=no"
        />
      </head>
      <body>
        <MantineProvider theme={theme} forceColorScheme='light'>
          <UserNavbar userName={userName} />
          <Notifications className='fixed bottom-0 right-0' position='bottom-right' zIndex={1000} limit={3} />
          {children}
        </MantineProvider>
      </body>
    </html>
  );
}
