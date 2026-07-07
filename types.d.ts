type Units = "ms" | "us" | "ns" | "s";

type delayQuery = {
  value?: number | undefined;
  units?: Units | undefined;
};

type SchemaElementType = "string" | "number" | "boolean" | "date";

type SchemaElement =
  | {
      type: SchemaElementType | SchemaElementType[] | "*";
      sampleResponse?: any | any[] | undefined;
      contentType?:
        | "longText"
        | "name"
        | "email"
        | "phone"
        | "age"
        | "url"
        | "imageUrl"
        | "address"
        | "price"
        | "currency"
        | "uuid";
    }
  | SchemaElementType;

type Schema = {
  [key: string]: SchemaElement;
};
