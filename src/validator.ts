import Ajv from "ajv";
import SchemaModel from "./schemas.js";

const ajv = new Ajv.default();

const validateSchema = ajv.compile(SchemaModel);

export default validateSchema;
