
import { 
    BlobServiceClient, 
    StorageSharedKeyCredential, 
    generateBlobSASQueryParameters,
    ContainerSASPermissions,
    SASQueryParametersOptions,
} from "@azure/storage-blob";
// https://learn.microsoft.com/en-us/javascript/api/overview/azure/storage-blob-readme?view=azure-node-latest
// https://learn.microsoft.com/en-us/samples/azure/azure-sdk-for-js/storage-blob-typescript/
// https://learn.microsoft.com/en-us/azure/storage/blobs/quickstart-blobs-javascript-browser

export const CONTAINTER_NAMES = {
    'private': 'privatevg',
    'public': 'publicvg',
    'temp': 'tempvg',
}


// Enter your storage account name and shared key
const account = process.env.BLOB_ACCOUNT_NAME as string;
const accountKey = process.env.BLOB_ACCOUNT_KEY as string;
const containerName = CONTAINTER_NAMES['private'];

// Use StorageSharedKeyCredential with storage account and account key
// StorageSharedKeyCredential is only available in Node.js runtime, not in browsers
const sharedKeyCredential = new StorageSharedKeyCredential(account, accountKey);
const blobServiceClient = new BlobServiceClient(
  `https://${account}.blob.core.windows.net`,
  sharedKeyCredential
);

const containerClient = blobServiceClient.getContainerClient(containerName);


// Create a service SAS for a blob container
export async function getContainerSasUri() {
    const sasOptions = {
        containerName: containerClient.containerName,
        permissions: ContainerSASPermissions.parse("racw"),
        startsOn: new Date(),
        expiresOn: new Date(new Date().valueOf() + 60 * 1000), // 1 min
    };


    const sasToken = generateBlobSASQueryParameters(sasOptions, sharedKeyCredential).toString();
    console.log(`SAS token for blob container is: ${sasToken}`);

    return `${containerClient.url}?${sasToken}`;
}
