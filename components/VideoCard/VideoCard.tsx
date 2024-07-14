import { VideoCardProps } from '@/components/VideoList/VideoList';
import { Box, LoadingOverlay } from '@mantine/core';

export default function VideoCard({videoCardProps}:{videoCardProps: VideoCardProps}){
    const videoUrl = videoCardProps.status === 'finished' ? videoCardProps.processedUrl : videoCardProps.originalUrl;
    console.log(videoUrl);
   return (
    
    <Box pos='relative' >
        <LoadingOverlay visible={videoCardProps.status === 'running'} zIndex={100} />
        <video className="w-auto object-cover h-[calc(100vh-10rem)]" controls>
            <source src={videoUrl} type="video/mp4"/>
        </video>
    </Box>
   )
}