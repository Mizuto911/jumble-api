type Units = "ms" | "us" | "ns" | "s";

type delayQuery = {
  value?: number | undefined;
  units?: Units | undefined;
};

type SchemaElementType = "string" | "number" | "boolean" | "date";

type SchemaElement =
  | {
      _type: SchemaElementType | SchemaElementType[] | "*";
      sampleResponse?: Array<string> | null;
      contentType?:
        | "longText"
        | "fullname"
        | "firstname"
        | "lastname"
        | "email"
        | "phone"
        | "age"
        | "url"
        | "imageUrl"
        | "address"
        | "price"
        | "currency"
        | "uuid"
        | null;
    }
  | SchemaElementType;

type Schema = {
  [key: string]: SchemaElement | Schema;
};

type SchemaOutput = {
  [key: string]: any;
};
