import {
    Box,
    Group,
} from '@mantine/core'
import { StoryBookDataType, StoryBook } from '@/components/StoryBook/StoryBook'
import StoryMeta from '@/components/StoryMeta/StoryMeta'
import { getStoryById } from '@/utils/db/admin'

// all generate pictures should be 16:9 or 9:16
const bookData =
{
    metadata: {
        title: "The Book of the New Sun",
        description: "A science fiction novel by Gene Wolfe",
        author: "Gene Wolfe",
        avatar: "https://play-lh.googleusercontent.com/7Ak4Ye7wNUtheIvSKnVgGL_OIZWjGPZNV6TP_3XLxHC-sDHLSE45aDg41dFNmL5COA=w480-h960-rw",
        author_id: "1",
        author_description: "Loves nature and science fiction.",
        view_count: 100,
        like_count: 10,
        dimenssions: [1920, 1280]
    },
    pages: [
        "https://unsplash.com/photos/fGr45dww3XQ/download?ixid=M3wxMjA3fDB8MXxhbGx8MTV8fHx8fHwyfHwxNzIwMDYwNzgxfA&force=true&w=1920",
        "https://unsplash.com/photos/B3rwdmrRHUU/download?ixid=M3wxMjA3fDB8MXxhbGx8MTZ8fHx8fHwyfHwxNzIwMDYwNzgxfA&force=true&w=1920",
    ]
}
export default async function BookPage(
    { params, searchParams }: {
        params: { id: string };
        searchParams?: { [key: string]: string | string[] | undefined };
    }
) {
    // console.log(params.id)
    const {story, error} = await getStoryById(parseInt(params.id))
    console.log(story[0])
    return (
        <div className='grid grid-cols-12 gap-4'>

            {/* <Box className='w-full xl:w-10/12 max-h-full h-auto md:max-h-[calc(100vh-60px)]  xl:pl-6'> */}
            <div className='col-span-12 xl:col-span-9 max-h-full h-auto md:max-h-[calc(100vh-60px)]  xl:pl-6'>
                <StoryBook storyData={story[0]} />
            </div>
            <div className='col-span-12 xl:col-span-3'>
                <StoryMeta storyDataFake={bookData} storyData={story[0]} />
            </div>
        </div>
    )
}