"use client";

import type { ReactNode } from "react";
import React, { createContext, useContext, useMemo } from "react";

import {
  BookSearchApiClient_V1,
  BookSearchApiClient_V2,
  HTTPResponseFormat,
} from "@acme/books-sdk";
import type { IBookSearchApiClient } from "@acme/books-shared";
import { useFeatureFlag } from "@acme/feature-flag-client";

const DEFAULT_CLIENT = new BookSearchApiClient_V1(HTTPResponseFormat.JSON);

const BookSearchApiClientContext =
  createContext<IBookSearchApiClient>(DEFAULT_CLIENT);

interface BookSearchApiClientProviderProps {
  children: ReactNode;
}
export function BookSearchApiClientProvider(
  props: BookSearchApiClientProviderProps,
) {
  const enableAPIFormatXML = useFeatureFlag("ff_enable_xml_format");
  const enableAPIV2 = useFeatureFlag("ff_enable_sdk_v2");

  console.log({ enableAPIFormatXML, enableAPIV2 });
  const format = useMemo(() => {
    if (enableAPIFormatXML) {
      return HTTPResponseFormat.XML;
    } else {
      return HTTPResponseFormat.JSON;
    }
  }, [enableAPIFormatXML]);

  const client = useMemo(() => {
    if (enableAPIV2) {
      return new BookSearchApiClient_V2(format);
    }
    return new BookSearchApiClient_V1(format);
  }, [enableAPIV2, format]);

  return (
    <BookSearchApiClientContext.Provider value={client}>
      {props.children}
    </BookSearchApiClientContext.Provider>
  );
}

export const useBookSearchApiClient = () =>
  useContext(BookSearchApiClientContext);
