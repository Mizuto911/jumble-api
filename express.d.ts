declare namespace Express {
  export interface Request {
    status: string | undefined;
    schema: Schema | undefined;
    schemaID: string | undefined;
    schemaCreate: SchemaCreateRequest;
    delay: number;
    options: {
      missing: boolean;
      wrongType: boolean;
      malformed: boolean;
      probability: number;
    };
  }
}
