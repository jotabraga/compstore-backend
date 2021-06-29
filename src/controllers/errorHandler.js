export default function errorHandler(error, res) {
  console.log(error?.details[0].type);
  switch (error?.details[0].type) {
    case "any.required":
    case "string.empty":
    case "string.min":
    case "string.max":
    case "string.length":
    case "string.base":
    case "number.min":
    case "number.base":
    case "date.base":
    case "DateTimeParseError":
    case "string.email":
    case "any.custom":
      res.status(400).send(error.details[0].message);
      break;
    case "string.guid":
    case "Unauthorized":
      res.status(401).send(error.details[0].message);
      break;
    case "not found":
      res.status(404).send(error.details[0].message);
      break;
    case "existent":
      res.status(409).send(error.details[0].message);
      break;
    default:
      res.status(500).send(error.details[0].message);
      break;
  }
}
