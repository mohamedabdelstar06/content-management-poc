import { createDirectus, rest, staticToken } from '@directus/sdk';
import { DirectusSchema } from '@/types/directus';
import { env } from '@/lib/env';

export function getDirectusClient() {
  const directus = createDirectus<DirectusSchema>(env.NEXT_PUBLIC_DIRECTUS_URL);
  
  if (env.DIRECTUS_STATIC_TOKEN) {
    return directus.with(staticToken(env.DIRECTUS_STATIC_TOKEN)).with(rest());
  }

  return directus.with(rest());
}

export const directus = getDirectusClient();
