import path from "path";
import { fileURLToPath } from "url";
import { Duration } from "aws-cdk-lib";
import {
  CacheCookieBehavior,
  CacheHeaderBehavior,
  CachePolicy,
  CacheQueryStringBehavior,
} from "aws-cdk-lib/aws-cloudfront";
import { NextjsSite, StackContext } from "sst/constructs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export function NextJsSiteStack({ stack }: StackContext) {
  const serverCachePolicy = new CachePolicy(stack, "ServerCache", {
    queryStringBehavior: CacheQueryStringBehavior.all(),
    headerBehavior: CacheHeaderBehavior.none(),
    cookieBehavior: CacheCookieBehavior.none(),
    defaultTtl: Duration.minutes(1),
    maxTtl: Duration.minutes(2),
    minTtl: Duration.minutes(1),
    enableAcceptEncodingBrotli: true,
    enableAcceptEncodingGzip: true,
  });

  const site = new NextjsSite(stack, "demo-books-api-web", {
    path: __dirname + "/../../",
    environment: {
      NEXT_PUBLIC_SITE_URL: "https://d286rl1ujj4u0.cloudfront.net", //manually added
    },
    cdk: {
      serverCachePolicy,
    },
  });

  stack.addOutputs({
    SiteUrl: site.url,
  });
}
