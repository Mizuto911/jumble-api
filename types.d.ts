type Units = "ms" | "us" | "ns" | "s";
type QueryBool = "0" | "1";

type delayQuery = {
  value?: number | undefined;
  units?: Units | undefined;
};

type OptionQuery = {
  missing?: QueryBool;
  wrongType?: QueryBool;
  malformed?: QueryBool;
  probability?: number;
};

type Options = {
  missing: boolean;
  wrongType: boolean;
  malformed: boolean;
  probability: number;
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
  | "portrait"
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

type SchemaCollection = {
  [key: string]: Schema;
};

type SchemaOutput = {
  [key: string]: any;
};

type SchemaCreateRequest = {
  schemaID: string;
  schema: Schema;
};

type SchemaUpdateRequest = SchemaCreateRequest;
