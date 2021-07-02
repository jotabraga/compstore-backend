export default function errorHandler(error, res) {
  if (error.message === "invalid signature" || error.message === "jwt malformed") {
    error = { details: [{type: error.message, message: error.message}]};
    console.log(error.message)
  }
  else if(error?.details)
    console.log(error.details[0].type);
  else
    error = { details: [{type: error, message: ""}]};
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
    case "invalid signature":
    case "string.guid":
    case "jwt malformed":
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
