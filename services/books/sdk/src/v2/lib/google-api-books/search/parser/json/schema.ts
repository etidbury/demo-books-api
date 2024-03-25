import { z } from "zod";

const VolumeInfoSchema = z.object({
  title: z.string(),
  subtitle: z.string().optional(),
  authors: z.array(z.string()).optional(),
  // publisher: z.string(),
  // publishedDate: z.string(),
  // description: z.string(),
  industryIdentifiers: z.array(
    z.object({
      type: z.string(),
      identifier: z.string(),
    }),
  ),
  // readingModes: z.object({
  //   text: z.boolean(),
  //   image: z.boolean(),
  // }),
  // pageCount: z.number(),
  // printType: z.string(),
  // categories: z.array(z.string()).optional(),
  // maturityRating: z.string(),
  // allowAnonLogging: z.boolean(),
  // contentVersion: z.string(),
  // panelizationSummary: z.object({
  //   containsEpubBubbles: z.boolean(),
  //   containsImageBubbles: z.boolean(),
  // }),
  // imageLinks: z.object({
  //   smallThumbnail: z.string(),
  //   thumbnail: z.string(),
  // }),
  // language: z.string(),
  // previewLink: z.string(),
  // infoLink: z.string(),
  // canonicalVolumeLink: z.string(),
});

const SaleInfoSchema = z.object({
  // country: z.string(),
  // saleability: z.string(),
  // isEbook: z.boolean(),
  listPrice: z
    .object({
      amount: z.number().optional(),
      currencyCode: z.string().optional(),
    })
    .optional(),
  retailPrice: z
    .object({
      amount: z.number().optional(),
      currencyCode: z.string().optional(),
    })
    .optional(),
  // buyLink: z.string().optional(),
  // offers: z
  //   .array(
  //     z.object({
  //       finskyOfferType: z.number(),
  //       listPrice: z.object({
  //         amountInMicros: z.number(),
  //         currencyCode: z.string(),
  //       }),
  //       retailPrice: z.object({
  //         amountInMicros: z.number(),
  //         currencyCode: z.string(),
  //       }),
  //       giftable: z.boolean(),
  //     }),
  //   )
  //   .optional(),
});

// const AccessInfoSchema = z.object({
//   country: z.string(),
//   viewability: z.string(),
//   embeddable: z.boolean(),
//   publicDomain: z.boolean(),
//   textToSpeechPermission: z.string(),
//   epub: z.object({
//     isAvailable: z.boolean(),
//     acsTokenLink: z.string().optional(),
//   }),
//   pdf: z.object({
//     isAvailable: z.boolean(),
//     acsTokenLink: z.string().optional(),
//   }),
//   webReaderLink: z.string(),
//   accessViewStatus: z.string(),
//   quoteSharingAllowed: z.boolean(),
// });

const ItemSchema = z.object({
  kind: z.string(),
  id: z.string(),
  etag: z.string(),
  selfLink: z.string(),
  volumeInfo: VolumeInfoSchema,
  saleInfo: SaleInfoSchema,
  // accessInfo: AccessInfoSchema,
  // searchInfo: z
  //   .object({
  //     textSnippet: z.string(),
  //   })
  //   .optional(),
});

export const GoogleApiBookSearchResponseSchemaJSON = z.object({
  kind: z.string(),
  totalItems: z.number(),
  items: z.array(ItemSchema),
});
