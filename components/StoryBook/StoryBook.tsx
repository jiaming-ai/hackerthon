'use client'
import { Group, Button, Text, Stack } from "@mantine/core";
import { FlippingPages } from 'flipping-pages';
import 'flipping-pages/dist/style.css';
import { useState, useRef, useEffect } from "react";
import { Tables } from '@/supabase/database.types';

export interface StoryBookDataType {
    metadata: {
        title: string,
        description: string,
        author: string,
        author_id: string,
        author_description: string,
        avatar: string,
        view_count: number,
        like_count: number,
        dimenssions: number[], //  width, height
    },
    pages: string[]
}
export function StoryBook({ storyData }: { storyData: Tables<'story'> }) {

    const [page, setPage] = useState(0);
    function handleNext() {
        setPage((current) => Math.min(current + 1, storyData.pages_text.length - 1));
    }

    function handlePrev() {
        setPage((current) => Math.max(current - 1, 0));
    }

    return (
        <Stack className="w-full h-auto xl:max-h-[calc(100vh-120px)]" align="center" gap='xs'>
            <Group justify="center" align="start" className="relative h-auto xl:max-h-[calc(100vh-120px)]">
                <img src={storyData.pages_image[page]} alt={storyData.title} className="object-contain rounded-lg max-w-full max-h-[calc(100vh-120px)]"/>
                <div className="absolute bottom-8 left-8 right-8 bg-amber-500/50 p-4 rounded-2xl">
                <Text c='white' size='sm'>{storyData.pages_text[page]}</Text>

                </div>
            </Group>
            <Group justify='center' align="center" className="h-[60px]">
                <Button variant='subtle' color='gray' onClick={handlePrev}>Back</Button>
                <Button variant='subtle' color='gray' onClick={handleNext}>Next</Button>
            </Group>
        </Stack>
    );
}
export function StoryBookFlip({ storyData }: { storyData: StoryBookDataType }) {


    const [selected, setSelected] = useState(0);
    const [containerHeight, setContainerHeightCN] = useState("calc(100vh-8rem)");
    const [buttonContainerWidth, setButtonContainerWidth] = useState("full");

    // assumes width / height ratio is 16:9
    const ratio = storyData.metadata.dimenssions[0] / storyData.metadata.dimenssions[1];
    const containerClassNameFixed = "w-full lg:w-[calc(100vw-150px)] justfy-start select-none touch-none flex items-start 2xl:items-center";

    const back = () => {
        setSelected(selected => Math.max(selected - 1, 0));
    };
    const next = () => {
        setSelected(selected => Math.min(selected + 1, 2));
    };


    useEffect(() => {
        function handleResize() {
            const height = window.innerHeight;
            const width = window.innerWidth;

            const bookHeight = height - 60 - 60; // 60px for header, 60px for button
            const bookWidth = (bookHeight * ratio).toFixed(0);

            setContainerHeightCN(`${bookHeight-20}px`); // bottom margin

            setButtonContainerWidth(`${bookWidth}px`);
            console.log(`bookWidth: ${bookWidth}, bookHeight: ${bookHeight}`)
        }
        handleResize();

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)

        }
    })

    // useEffect(() => {
    //     const bookHeight = height - 60 - 60; // 60px for header, 60px for footer
    //     setContainerHeightCN(`${bookHeight}px`);

    //     const bookWidth = (bookHeight * ratio).toFixed(0);
    //     setButtonContainerWidth(`${bookWidth}px`);
    //     console.log(`bookWidth: ${height}, bookHeight: ${bookHeight}`)

    // }, [width, height])

    return (
        <>
            <Group justify='center' align="center" className="h-[60px]" style={{ width: buttonContainerWidth }}>
                <Button variant='subtle' color='gray' onClick={back}>Back</Button>
                <Button variant='subtle' color='gray' onClick={next}>Next</Button>
            </Group>
            <div className={containerClassNameFixed} style={{ height: containerHeight }}>

                <FlippingPages
                    direction="right-to-left"
                    onSwipeEnd={setSelected}
                    selected={selected}
                >
                    {storyData.pages.map((page, index) => (
                        <div key={index} className="
                    w-auto
                    lg:w-[calc(100vw-200px)] 
                    justfy-start select-none touch-none flex 
                    items-start
                    2xl:items-center"
                            style={{ height: containerHeight }}
                        >

                            <img src={page} className="object-contain max-w-full max-h-full" alt={storyData.metadata.title} />
                        </div>
                    ))}

                </FlippingPages>
            </div>
        </>

    );
}