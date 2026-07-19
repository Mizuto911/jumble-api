import Ajv from "ajv";
import SchemaModel from "./schemas.js";

const ajv = new Ajv.default({ allowUnionTypes: true });

const validateSchema = ajv.compile(SchemaModel);

export default validateSchema;
