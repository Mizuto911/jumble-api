type Units = "ms" | "us" | "ns" | "s";

type delayQuery = {
  value?: number | undefined;
  units?: Units | undefined;
};

type PrimaryTypes = "string" | "number" | "boolean" | "date";

type MockTypes =
  | "sex"
  | "fullname"
  | "firstname"
  | "lastname"
  | "email"
  | "phone"
  | "url"
  | "imageUrl"
  | "avatarUrl"
  | "countryCode"
  | "address"
  | "color"
  | "zipcode"
  | "currency"
  | "uuid"
  | null;

type PickFrom = Array<string | number | boolean> | null;

type ArrayLength =
  | number
  | {
      min: number;
      max: number;
    }
  | null;

type SchemaElementFormat = {
  array?: ArrayLength;
  format?: PrimaryTypes | MockTypes;
  pickFrom?: PickFrom | null;
  min?: number | null;
  max?: number | null;
};

type SchemaElement = PrimaryTypes | MockTypes | SchemaElementFormat;

type SchemaProperties = {
  [key: string]: SchemaElement | Schema;
};

type Schema =
  | SchemaProperties
  | {
      array?: ArrayLength;
      properties: SchemaProperties;
    };

type SchemaOutput = {
  [key: string]: any;
};
