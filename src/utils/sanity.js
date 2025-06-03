import {createClient} from '@sanity/client';
import ImageUrlBuilder from '@sanity/image-url';

export const client = createClient({
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
    apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION,
    useCdn: true, // `false` if you want to ensure fresh data
});

const builder = ImageUrlBuilder(client);

export function urlFor(source) {
    return builder.image(source);
}

