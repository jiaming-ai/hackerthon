'use server'

import { getUser } from "./auth/authServer";
import { getContainerSasUri, CONTAINTER_NAMES } from "./azure/blob";

interface UploadParams {
    sasUri: string;
    containerName: string;
    account: string;
    error: string | null;
    blobName: string;
}


export async function getUploadParams(): Promise<UploadParams> {
    const user = await getUser();
    if (!user) {
        return {error: 'User not found', sasUri: '', containerName: '', account: '', blobName: ''};
    }
    // TODO check permissions
    const sasUri = await getContainerSasUri();
    const blobName = user.id + new Date().getTime();
    return {
        sasUri,
        containerName: CONTAINTER_NAMES['private'],
        account: process.env.BLOB_ACCOUNT_NAME as string,
        error: null, 
        blobName,
    }
}