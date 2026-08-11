const invalidSchema = {
  id: "uui",
  name: "fullname",
  email: "email",
  age: {
    format: "number",
    min: 18,
    max: 99,
  },
};

export default invalidSchema;
