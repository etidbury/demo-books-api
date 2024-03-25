import { env } from "./lib/env";

export const STACK_NAME_PREFIX = `${env.SYSTEM_NAME}--${env.DEPLOY_ENV}--`;

export { env };
