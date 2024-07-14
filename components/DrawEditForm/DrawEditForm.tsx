'use client'

import { Card, Group, Box, Button, ScrollArea, Title, Text, Divider, LoadingOverlay } from "@mantine/core";
import { IconFilePencil, IconPlayerPlay, IconDeviceFloppy, IconScribble, IconEdit, IconRotate } from '@tabler/icons-react';
import { useState, useEffect } from "react";
import { Database, Tables, TablesInsert, TablesUpdate } from '@/supabase/database.types';
import { updateStoryAction } from "@/app/(withSideBar)/create/action";
import { DrawCardProps, DrawCard } from "../DrawCard/DrawCard";
import { generateImagePromptAction, generateImageAndUploadAction } from '@/app/(withSideBar)/draw/action';

export default function DrawEditForm({ storyData }: { storyData: Tables<'story'> }) {
    const [generating, setGenerating] = useState(false);
    const [drawCards, setDrawCards] = useState<DrawCardProps[]>([]);


    function handlePublish() {
    }
    function generate(force: boolean = false, pageNumber?: number) {
        generateImagePromptAction(storyData).then((imagePrompts) => {

            imagePrompts.prompts.forEach((prompt, index) => {
                const currentPage = prompt.page
                if (!pageNumber || currentPage === pageNumber) {
                    // TODO if a new prompt is provided, update the prompt
                    let promptText = prompt.prompt;
                    console.log(`Drawing image for story ${storyData.id} page ${currentPage}`)
                    // only draw if the image does not exist or force is true
                    if (!storyData.pages_image[currentPage - 1] || force) {
                        generateImageAndUploadAction(promptText, storyData.id, currentPage).then(() => {
                            console.log('Image generated and uploaded')
                            // update the image in the story
                            storyData.pages_image[currentPage - 1] = `https://nhvnjpmuzvjtmkilwjpx.supabase.co/storage/v1/object/public/images/public/${storyData.id}/${currentPage}.png`
                            setDrawCards((prev) => {
                                const newDrawCards = [...prev]
                                newDrawCards[currentPage - 1].image = `https://nhvnjpmuzvjtmkilwjpx.supabase.co/storage/v1/object/public/images/public/${storyData.id}/${currentPage}.png`
                                newDrawCards[currentPage - 1].isDrawing = false
                                return newDrawCards
                            });
                            // update the story
                            updateStoryAction(storyData)
                        })
                    }
                }
            })
        })
    }
    useEffect(() => {
        const props: DrawCardProps[] = [];
        for (let i = 0; i < storyData.pages_text.length; i++) {

            props.push({
                image: storyData.pages_image[i] || '',
                text: storyData.pages_text[i],
                pageNumber: i + 1,
                isDrawing: storyData.pages_image[i] ? false : true
            })
        }
        setDrawCards(props);
        if (storyData && storyData.pages_text.length > 0
            && storyData.pages_image.length < storyData.pages_text.length) {
            generate();
        }
    }, [])
    useEffect(() => {
        const isGenerating = drawCards.some((card) => card.isDrawing)
        setGenerating(isGenerating)
    }, [drawCards])

    return (
        <div className="w-full md:w-[600px]">
            {/* {generating && <Text>Generating images...</Text>} */}

            <ScrollArea className='h-[calc(100vh-200px)] mt-8' type="auto">
                {drawCards.map((card, index) => (
                    <div key={index} className="mb-8">
                    <DrawCard props={card} />

                    </div>
                ))}

            </ScrollArea>


            <Group justify="center" className="mt-4 h-[60px]">
                <Box pos='relative'>
                    <LoadingOverlay visible={generating} />
                    <Button
                        size="md"
                        variant="light"
                        component="a"
                        href={`/book/${storyData.id}`}
                        leftSection={<IconDeviceFloppy size={20} />}
                    >
                        Publish
                    </Button>

                </Box>

                {/* <Button 
        size="md" 
        variant="light" 
        component="a"
        href={`/draw/${story.id}`}
        leftSection={<IconScribble size={20} />}
        >
          Draw pictures!
        </Button> */}

            </Group>
        </div>
    )
}