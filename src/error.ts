export class FormatDeclarationError extends Error {
  constructor(
    message: string = "Format Declaration should have either 'format' or 'pickFrom' property.",
  ) {
    super(message);
    Object.setPrototypeOf(this, FormatDeclarationError.prototype);
  }
}

export class NullSchemaElementError extends Error {
  constructor(
    message: string = "Schema Element passed in the function is empty.",
  ) {
    super(message);
    Object.setPrototypeOf(this, NullSchemaElementError.prototype);
  }
}

export class NullPickFromArrayError extends Error {
  constructor(
    message: string = "The 'pickFrom' array passed into the function is empty.",
  ) {
    super(message);
    Object.setPrototypeOf(this, NullPickFromArrayError.prototype);
  }
}
