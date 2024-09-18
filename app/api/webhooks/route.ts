import { Webhook } from 'svix';
import { headers } from 'next/headers';
import { WebhookEvent } from '@clerk/nextjs/server';
import { createUser, deleteUser } from '@/lib/actions/user';

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env or .env.local');
    }

    // Get the headers
    const headerPayload = headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

    // If there are no headers, return an error
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- missing Svix headers', {
            status: 400,
        });
    }

    // Get the body
    const payload = await req.json();
    const body = JSON.stringify(payload);

    // Create a new Svix instance with your secret.
    const wh = new Webhook(WEBHOOK_SECRET);

    let evt: WebhookEvent;

    // Verify the payload with the headers
    try {
        evt = wh.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', {
            status: 400,
        });
    }

    const evtType = evt.type;

    // Handle user.created or user.updated events
    if (evtType === 'user.created' || evtType === 'user.updated') {
        const { id, first_name, last_name, image_url, email_addresses } = evt.data;

        try {
            await createUser(
                id,
                first_name ?? "", // Provide fallback
                last_name ?? "",
                image_url ?? "",
                email_addresses ?? [],
            );

            return new Response('User is created or updated', {
                status: 200,
            });
        } catch (error) {
            console.error('Error handling user created/updated event:', error);
            return new Response('Server Error', {
                status: 500,
            });
        }
    }

    // Handle user.deleted event
    if (evtType === 'user.deleted') {
        try {
            const { id } = evt.data;
            await deleteUser(id??"");

            return new Response('User Deleted', {
                status: 200,
            });
        } catch (error) {
            console.error('Error handling user deleted event:', error);
            return new Response('Server Error', {
                status: 500,
            });
        }
    }

    // Return a response for unsupported events
    return new Response('Event not handledd', {
        status: 200,
    });
}
