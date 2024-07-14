'use client'
import { useState } from 'react';
import { Group, Code, Divider } from '@mantine/core';
import {
IconBook,
IconWriting,
IconBrandEdge,
IconNotification,
IconTemperature,
IconPlus,
} from '@tabler/icons-react';
import { usePathname } from 'next/navigation';
import classes from './Sidebar.module.css';


export function Sidebar() {
    const pathname = usePathname();
    const currentPath = '/' + pathname.split('/')[1];

    const data = [
        { link: '/', label: 'Explore', icon: IconBrandEdge },
        { link: '/library/1', label: "My Library", icon: IconBook },
        { link: '/library/1', label: "Susan's Library", icon: IconBook },
        { link: '/library/2', label: "Phip's Library", icon: IconBook },
        { link: '', label: 'My Creations', icon: IconWriting },
        { link: '', label: 'Notifications', icon: IconNotification },
    ]

    let active: string = '';
    for (let i = 0; i < data.length; i++) {
        if (currentPath === data[i].link) {
            active = data[i].label;
            break;
        }
    }
    const links = data.map((item, index) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={index}
        >
            <item.icon className={classes.linkIcon} />
            <span className={classes.linkText}>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            {/* <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                    <h3 className={classes.title}>Tasks</h3>
                </Group>
            </div> */}
            {links}
            <Divider size='xs' c='gray' className='w-full my-2'/>
            <a className={classes.link} href="/create">
                <IconPlus className={classes.linkIcon} />
                <span className={classes.linkText}>Create</span>
            </a>

        </nav>
    );
}