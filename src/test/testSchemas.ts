const testSchemas: SchemaCollection = {
  userSchema: {
    id: "uuid",
    name: "fullname",
    email: "email",
    age: {
      format: "number",
      min: 18,
      max: 99,
    },
  },
  userAdmin: {
    id: "uuid",
    name: "fullname",
    email: "email",
    age: {
      format: "number",
      min: 18,
      max: 100,
    },
    bio: {
      format: "string",
      min: 10,
      max: 20,
    },
    sex: "sex",
    pref: {
      properties: {
        darkMode: "boolean",
        isPremium: "boolean",
      },
    },
  },
  testSchema: {
    name: "fullname",
    age: {
      format: "number",
      min: 18,
      max: 50,
    },
  },
  invalidRange: {
    age: {
      format: "number",
      min: 56,
      max: 50,
    },
  },
};

export default testSchemas;
