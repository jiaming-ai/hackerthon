'use client'

import { useRef, useState } from 'react';
import { Text, Group, Button, rem, useMantineTheme } from '@mantine/core';
import { Dropzone, MIME_TYPES } from '@mantine/dropzone';
import { IconCloudUpload, IconX, IconDownload } from '@tabler/icons-react';
import classes from './Uploader.module.css';
import axios from 'axios';
import { getUploadParams} from '@/utils/create';
import { BlobServiceClient } from '@azure/storage-blob';
import { notifications } from '@mantine/notifications';

export function Uploader({setFileUrl, setFileName}: 
  {setFileUrl: (url: string) => void, 
  setFileName: (name: string) => void, 
}){
  const theme = useMantineTheme();
  const openRef = useRef<() => void>(null);
  const [ loading, setLoading ] = useState(false);

  async function handleUpload(file: any) {

    const {sasUri, containerName, error, blobName} = await getUploadParams();
    if (error) {
      console.error(error);
      notifications.show({
        title: 'Upload failed',
        message: "Please try again",
        autoClose: 2000,
      })
      return;
    }
    // console.log(sasUri, containerName, blobName);
    const blobServiceClient = new BlobServiceClient(sasUri);
    const containerClient = blobServiceClient.getContainerClient(containerName);
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    setLoading(true);
    try {
      const uploadBlobResponse = await blockBlobClient.uploadData(file[0]);
    }
    catch (error) {
      console.error(error);
      setLoading(false);
      notifications.show({
        title: 'Upload failed',
        message: "Please try again",
        autoClose: 2000,
      })
      return;
    }
    setLoading(false);
    setFileUrl(blockBlobClient.url.split('?')[0]);
    setFileName(file[0].path)
  }

  return (
    <div className={classes.wrapper}>
      <Dropzone
        openRef={openRef}
        loading={loading}
        onDrop={handleUpload}
        radius="md"
        accept={{'video/*':[]}}
        maxSize={30 * 1024 ** 2}
      >
        <div className={classes.dropzone}>
          <Group justify="center">
            <Dropzone.Accept>
              
              <IconDownload
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.blue[6]}
                stroke={1.5}
              />
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                style={{ width: rem(50), height: rem(50) }}
                color={theme.colors.red[6]}
                stroke={1.5}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <IconCloudUpload style={{ width: rem(50), height: rem(50) }} stroke={1.5} />
            </Dropzone.Idle>
          </Group>

          <Text ta="center" fw={700} fz="lg" mt="xl">
            <Dropzone.Accept>Drop files here</Dropzone.Accept>
            <Dropzone.Reject>Pdf file less than 30mb</Dropzone.Reject>
            <Dropzone.Idle>Upload Video</Dropzone.Idle>
          </Text>
          <Text ta="center" fz="sm" mt="xs" c="dimmed">
            Drop videos here to upload. <br></br>
            Accept <i>.mp4, .mov</i> files that
            are less than 30mb.
          </Text>
        </div>
      </Dropzone>

    </div>
  );
}