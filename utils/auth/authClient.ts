import { createClient } from "../supabase/client";

export async function getUser() {
    const client = createClient();
    const { data, error} = await client.auth.getSession();

    if (data) {
        return data?.session?.user;
    }
    return null;
}

