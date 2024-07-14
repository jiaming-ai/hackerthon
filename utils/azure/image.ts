import { OpenAIClient, AzureKeyCredential } from "@azure/openai";
import { decode } from 'base64-arraybuffer'
// import { createClient } from "../supabase/server";
import { createClient } from '@supabase/supabase-js';
import { Database, Tables, TablesInsert, TablesUpdate } from '@/supabase/database.types';

const supabaseAdmin = createClient<Database>(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.SUPABASE_SERVICE_ROLE_KEY || ''
)

// You will need to set these environment variables or edit the following values
const endpoint = process.env["AZURE_OPENAI_ENDPOINT"] || "<endpoint>";
const azureApiKey = process.env["AZURE_API_KEY"] || "<api key>";
const deploymentName = "Dalle3";


export async function generateImageAndUpload(prompt: string, sotryId: number, storyPage: number) {
    const b64Data = await generateImage(prompt);
    const { data, error } = await supabaseAdmin
        .storage
        .from('images')
        .upload(`public/${sotryId}/${storyPage}.png`, decode(b64Data as string), {
            contentType: 'image/png'
        })
    console.log(data, error)
}

async function generateImage(prompt: string) {
    // The prompt to generate images from
    const style = 'vivid'; // 'natural' or 'vivid'
    // const size = "1792x1024"; // 1024x1024, 1792x1024, or 1024x1792.
    // const quality = 'hd'; // 'hd' or 'standard'
    const size = "1024x1024"; // 1024x1024, 1792x1024, or 1024x1792.
    const quality = 'standard'; // 'hd' or 'standard'
    const responseFormat = 'b64_json'; // 'url' or 'b64_json'
    const n = 1; // must be 1 for dall-e-3

    const options = {
        n,
        size,
        style,
        quality,
        responseFormat
    };

    // The number of images to generate


    const client = new OpenAIClient(endpoint, new AzureKeyCredential(azureApiKey));
    const result = await client.getImages(deploymentName, prompt, options);
    console.log(result)
    if (result.hasOwnProperty('inner_error')) {
        throw new Error(result.inner_error)
    }
    
    const b64Data = result.data[0].base64Data;
    // const url = result.data[0].url;


    return b64Data;

}

