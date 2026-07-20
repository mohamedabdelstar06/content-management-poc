import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_DIRECTUS_URL: z.string().url("Must be a valid URL"),
  DIRECTUS_STATIC_TOKEN: z.string().optional(),
});

const parsedEnv = envSchema.safeParse({
  NEXT_PUBLIC_DIRECTUS_URL: process.env.NEXT_PUBLIC_DIRECTUS_URL,
  DIRECTUS_STATIC_TOKEN: process.env.DIRECTUS_STATIC_TOKEN,
});

if (!parsedEnv.success) {
  console.error("Invalid environment variables:", parsedEnv.error.format());
  throw new Error("Invalid environment variables");
}

export const env = parsedEnv.data;
