'use server'

import { generateImagePrompt } from '@/utils/azure/llm'
// import { generateImagePrompt } from '@/utils/aws/llm'
import { Tables } from '@/supabase/database.types'
import { generateImageAndUpload } from '@/utils/azure/image'
import { updateStory } from '@/utils/db/admin'

export async function generateImagePromptAction(storyData: Tables<'story'>) {
    if (storyData.generation_data && storyData.generation_data.hasOwnProperty('imagePrompts')) {
        console.log('Generation data already exists');
        return storyData.generation_data.imagePrompts 
    }
    const imagePrompt = await generateImagePrompt(storyData)
    // update the story with the image prompts
    // the database has been updated
    storyData.generation_data = {
        ...storyData.generation_data as object,
        imagePrompts: imagePrompt
    }
    console.log(imagePrompt)
    return imagePrompt
}

export async function generateImageAndUploadAction(prompt:string, storyId: number, pageNumber: number) {
    await generateImageAndUpload(prompt, storyId, pageNumber)

}