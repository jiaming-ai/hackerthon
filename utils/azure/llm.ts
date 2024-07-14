import { OpenAIClient, AzureKeyCredential } from "@azure/openai"
import { Langfuse } from 'langfuse'
import { getUser } from '@/utils/auth/authServer'
import dotenv from "dotenv";
import { insertStory, updateStory } from '@/utils/db/admin'
import { Tables } from "@/supabase/database.types"
dotenv.config();
const DEBUG = false

const langfuse = new Langfuse({
  secretKey: process.env.LANGFUSE_SECRET_KEY,
  publicKey: process.env.LANGFUSE_PUBLIC_KEY,
  baseUrl: process.env.LANGFUSE_HOST,
});

const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint>";
const apiKey = process.env["AZURE_API_KEY"] || "<api key>";
const apiVersion = "2024-04-01-preview";
const deploymentName = "gpt-4o"; // "gpt-4o" or "fcfgpt35"

const options = {
  temperature: 0.1,
  topP: 1,
  frequencyPenalty: 0,
  presencePenalty: 0,
  maxTokens: 3000,
}

export enum StoryTypes {
  PictureBookConcept = 'PictureBookConcept',
}

export interface MessageType {
  role: string,
  content: string,
}

export interface StoryGenerationOptionsType {
  parsePrompt: boolean,
  age?: string,
  pageCount?: string,
  wordCountPerPage?: string,
  storyType?: StoryTypes,

}

export async function parseVariables(userPrompt: string, template: string, templateName: string, trace: any): Promise<any> {
  const parseSpan = trace.span(
    {
      name: "parseVariables",
      input: {
        userPrompt,
        template
      },
    }
  )
  const parseTemplatePrompt = await langfuse.getPrompt("Parse"+templateName, undefined, { type: 'chat' });
  if (!parseTemplatePrompt) {
    throw new Error('Parse Template not found')
  }
  const messages = parseTemplatePrompt.compile({ user_prompt: userPrompt, template })
  console.log(messages)

  parseSpan.end(
    {
      output: {
        messages,
      },
    }
  )
  const parseRet = await generate(trace, messages, parseTemplatePrompt)
  return JSON.parse(parseRet)
}

export async function generateStory(userPrompt: string, userOptions: StoryGenerationOptionsType): Promise<any> {

  console.log(userOptions)
  const user = await getUser()
  if (!user) {
    throw new Error('User not found')
  }
  // TODO - get sessionId from user
  const sessionId = '1234'
  const trace = langfuse.trace({
    name: "generateStory",
    sessionId: sessionId,
    userId: user.email,
    public: false,
  });


  const promptSpan = trace.span({
    name: "processPrompt",
    input: {
      userPrompt,
    },
  });

  // TODO - get variables from user
  let variables = { user_prompt: userPrompt }
  let lfPrompt = null;
  if (userOptions.parsePrompt) {
    const genType = userOptions.storyType as StoryTypes
    lfPrompt = await langfuse.getPrompt(StoryTypes[genType], undefined, { type: 'chat' });
    if (!lfPrompt) {
      throw new Error('Prompt not found')
    }
    const parsedVariables = await parseVariables(userPrompt, lfPrompt.prompt[0].content, StoryTypes[genType], trace)
    variables = { ...variables, ...parsedVariables, ...userOptions }
    console.log('parsedVariables', parsedVariables)
  }
  else {
    lfPrompt = await langfuse.getPrompt("GenerateStory", undefined, { type: 'chat' });
  }

  const compiledMessages = lfPrompt.compile(variables)
  console.log(compiledMessages)


  promptSpan.end({
    output: {
      messages: compiledMessages,
    }
  })

  const allText = await generate(trace, compiledMessages, lfPrompt)

  const sanitizedQuery = userPrompt.trim();
  trace.update({
    input: sanitizedQuery,
    output: allText,
    metadata: {
      userOptions,
    },
  });

  const parsedStory = JSON.parse(allText)

  const { story, error } = await insertStory({
    pages_text: parsedStory.pages,
    author_id: user?.id,
    title: parsedStory.title
  })

  await langfuse.flushAsync();

  if (error) {
    console.error(error)
  }
  if (story) {
    return story[0]
  }

}

export async function generateImagePrompt(storyData: Tables<'story'>) {

  const user = await getUser()
  if (!user) {
    throw new Error('User not found')
  }
  // TODO - get sessionId from user
  const sessionId = '1234'
  const trace = langfuse.trace({
    name: "generateImagePrompt",
    sessionId: sessionId,
    userId: user.email,
    public: false,
  });
  
  const storyJson = {
    title: storyData.title,
    pages: storyData.pages_text
  }

  const storyJsonString = JSON.stringify(storyJson)

  const promptSpan = trace.span({
    name: "processPrompt",
    input: {
      storyJsonString,
    },
  });

  const lfPrompt = await langfuse.getPrompt("GenerateImagePrompt", undefined, { type: 'chat' });
  if (!lfPrompt) {
    throw new Error('Prompt not found')
  }

  const compiledMessages = lfPrompt.compile({user_prompt:storyJsonString})
  console.log(compiledMessages)

  promptSpan.end({
    output: {
      messages: compiledMessages,
    }
  })

  const allText = await generate(trace, compiledMessages, lfPrompt)
  console.log(allText)
  trace.update({
    input: storyJsonString,
    output: allText,
  });

  const parsedPrompts = JSON.parse(allText)
  await updateStory({
    ...storyData,
    generation_data:{
      ...storyData.generation_data as object,
      imagePrompts: parsedPrompts
    } 
  })

  await langfuse.flushAsync();


  return parsedPrompts
}


async function generateStream(trace: any, messages: MessageType[], lfPrompt: any) {

  let allText: string = '';
  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(apiKey));

  const generation = trace.generation({
    input: messages,
    model: deploymentName === "gpt-4o" ? "gpt-4o" : "gpt-3.5-turbo",
    prompt: lfPrompt,
  });

  const events = await client.streamChatCompletions(
    deploymentName,
    messages,
    options);


  for await (const event of events) {
    if (event?.choices[0]?.delta?.content !== undefined) {
      const newContent = event.choices[0].delta.content
      allText += newContent
    }
  }

  generation.end({
    output: allText,
  });

  return allText

}

async function generate(trace: any, messages: MessageType[], lfPrompt: any) {

  const client = new OpenAIClient(
    endpoint,
    new AzureKeyCredential(apiKey));

  const generation = trace.generation({
    input: messages,
    model: deploymentName === "gpt-4o" ? "gpt-4o" : "gpt-3.5-turbo",
    prompt: lfPrompt,
  });


  if (DEBUG) {
    console.log('messages', messages)
    return 'debug message'
  }

  const completions = await client.getChatCompletions(
    deploymentName,
    messages,
    options);

  const allText = completions.choices[0].message?.content || '';

  generation.end({
    output: allText,
  });

  return allText

}
