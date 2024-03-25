import { createEnv } from "@t3-oss/env-nextjs";
import { z } from "zod";

export const env = createEnv({
  server: {
    SYSTEM_NAME: z.string().min(1),
    //DEPLOY_ENV: z.enum(["local", "test", "dev", "stage", "prod"]),
    DEPLOY_ENV: z.string().min(1).default("local"),
    AWS_REGION: z.string().min(1).default("eu-west-1"),
  },
  client: {},
  runtimeEnv: {
    SYSTEM_NAME: process.env.SYSTEM_NAME,
    DEPLOY_ENV: process.env.DEPLOY_ENV,
    AWS_REGION: process.env.AWS_REGION,
  },
  //skipValidation: !!process.env.CI || !!process.env.SKIP_ENV_VALIDATION,
});
