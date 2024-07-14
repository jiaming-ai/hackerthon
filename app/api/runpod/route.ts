import { headers } from 'next/headers'
import { updateVideoRecordStatus } from '@/utils/supabase/admin'

export async function POST(request: Request) {
    try {
        const headersList = headers()
        const referer = headersList.get('referer')

        // check authorization barer token is 192038dj
        const authorization = headersList.get('Authorization')
        if (authorization !== 'Bearer 192038Ldfk39a3fddj') {
            return new Response('Unauthorized', {
                status: 401,
            })
        }

        const data = await request.json()

        console.log(data)
        // Process the webhook payload

      if (data.status === 'success') {
        await updateVideoRecordStatus({
          id: data.video_id,
          status: 'finished',
          processed_url: data.url
        });
      }

    } catch (error) {
        console.error(error)
    }

    return new Response('Success!', {
        status: 200,
    })
}