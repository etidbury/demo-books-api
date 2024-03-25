import { useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import qs from "qs";

const FEATURE_FLAG_QUERY_PARAM = "ff";

/**
 *
 * @deprecated
 *
 */
export function router__useFeatureFlag(featureName: string) {
  const router = useRouter();

  const featureQueryParamEnabled = useMemo<boolean>(() => {
    const queryString = router.asPath.split("?")[1];
    const queryParamsParsed = qs.parse(queryString ?? "");

    return (
      typeof queryParamsParsed[`${FEATURE_FLAG_QUERY_PARAM}_${featureName}`] !==
        "undefined" ||
      typeof queryParamsParsed[`${featureName}`] !== "undefined"
    );
  }, [router?.query]);

  return featureQueryParamEnabled;
}

export function useFeatureFlag(featureName: string) {
  const searchParams = useSearchParams();

  const featureQueryParamEnabled = useMemo<boolean>(() => {
    const queryString = searchParams.toString();

    const queryParamsParsed = qs.parse(queryString);

    const featureFlagQueryParams = queryParamsParsed[FEATURE_FLAG_QUERY_PARAM];

    return (
      (typeof featureFlagQueryParams === "object" &&
        Object.keys(featureFlagQueryParams).includes(featureName)) ||
      typeof queryParamsParsed[`${FEATURE_FLAG_QUERY_PARAM}_${featureName}`] !==
        "undefined" ||
      typeof queryParamsParsed[`${featureName}`] !== "undefined"
    );
  }, [searchParams]);

  return featureQueryParamEnabled;
}
