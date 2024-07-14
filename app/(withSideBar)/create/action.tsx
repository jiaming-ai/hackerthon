'use server'

import { redirect } from 'next/navigation'
import { generateStory, StoryGenerationOptionsType, StoryTypes } from '@/utils/azure/llm';
// import { generateStory, StoryGenerationOptionsType, StoryTypes } from '@/utils/aws/llm';

import { insertStory, getStoryById, updateStory } from '@/utils/db/admin';

import { Database, Tables, TablesInsert, TablesUpdate } from '@/supabase/database.types';

export async function updateStoryAction(storyData: Tables<'story'>) {
    await updateStory(storyData)
}

function useAgeDefaults(age: string) {
    let pageCount = '6-10'
    let wordCountPerPage = '5-10'
    switch (age) {
        case '0-1':
            pageCount = '6-10'
            wordCountPerPage = '5-10'
            break;
        case '1-3':
            pageCount = '8-12'
            wordCountPerPage = '8-15'
            break;
        case '3-5':
            pageCount = '10-15'
            wordCountPerPage = '10-25'
            break;
        case '6-12':
            pageCount = '10-15'
            wordCountPerPage = '15-30'
            break;
    }
    return { pageCount, wordCountPerPage }
}

export async function createStory(data:FormData) {
    console.log(data);
    const parsePrompt = data.get('parsePrompt') === 'on' ? true : false
    const options: StoryGenerationOptionsType = {
        parsePrompt: parsePrompt,
    }
    if (parsePrompt) {
        // make sure the options are valid
        const storyType = data.get('storyType') as StoryTypes
        const age = data.get('age') as string
        const { pageCount, wordCountPerPage } = useAgeDefaults(age)

        options.storyType = storyType
        options.age = age
        options.pageCount = pageCount
        options.wordCountPerPage = wordCountPerPage
    }
    const userPrompt = data.get('prompt') as string
    const story = await generateStory(userPrompt, options)
    console.log(story);

    if (story) {
        redirect(`/create/${story.id}`)
    }
}