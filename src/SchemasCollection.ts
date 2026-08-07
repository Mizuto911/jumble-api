export default class SchemasCollection {
  private collection: SchemaCollection;
  public default: Schema;

  constructor(collection?: SchemaCollection) {
    this.default = {
      id: "uuid",
      firstname: "firstname",
      lastname: "lastname",
      sex: "sex",
      email: "email",
      phone: "phone",
      profilePic: "avatarUrl",
    };

    if (collection) {
      this.collection = collection;
    } else {
      this.collection = {};
    }
  }

  getAll() {
    return this.collection;
  }

  get(id: string): Schema | undefined {
    return this.collection[id];
  }

  update(id: string, schema: Schema) {
    if (!(id in this.collection) || this.collection[id] === undefined) {
      throw new TypeError(
        `Schema with id '${id}' does not exist on Schemas Collection.`,
      );
    }

    this.collection[id] = schema;
  }

  delete(id: string) {
    if (!(id in this.collection) || this.collection[id] === undefined) {
      throw new TypeError(
        `Schema with id '${id}' does not exist on Schemas Collection.`,
      );
    }

    delete this.collection[id];
  }

  add(id: string, schema: Schema) {
    if (id in this.collection || this.collection[id] !== undefined) {
      throw new TypeError(
        `Schema with id '${id}' already exists on Schemas Collection.`,
      );
    }

    this.collection[id] = schema;
  }
}
