export class FormatDeclarationError extends Error {
  constructor(message?: string) {
    super(
      message ??
        "Format Declaration should have either 'format' or 'pickFrom' property.",
    );
    Object.setPrototypeOf(this, FormatDeclarationError.prototype);
  }
}

export class NullSchemaElementError extends Error {
  constructor(message?: string) {
    super(message ?? "Schema Element passed in the function is empty.");
    Object.setPrototypeOf(this, NullSchemaElementError.prototype);
  }
}

export class NullPickFromArrayError extends Error {
  constructor(message?: string) {
    super(message ?? "The 'pickFrom' array passed into the function is empty.");
  }
}
