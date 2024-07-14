'use client'

import VideoCard from '../VideoCard/VideoCard';
import { Database } from '@/types/supabase';
import { Stack } from '@mantine/core';

// TODO lazy load video cards
// https://dev.to/mattlewandowski93/lazy-loaded-video-component-in-react-22dp
export type VideoCardProps = {
    originalUrl: string,
    processedUrl: string,
    options: {
        style: string,
        duration: number,
        similarity: number
    }
    status: Database["public"]["Enums"]["video_status"]
}
export function VideoList({videos}: {videos:VideoCardProps[]}){
    return (
        <Stack className="" justify='center' align='center'>
            {videos.map((video, index) => (
            <VideoCard key={index} videoCardProps={video}/>
            ))}
        </Stack>
    )
}


