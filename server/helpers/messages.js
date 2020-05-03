const Success = (
  res,
  { data, status = 200, message = "", success = true, code = "" }
) => {
  res.status(status).send({
    data,
    code,
    success,
    message
  });
};
const Unexpected = (
  res,
  { data, message = "", success = false, code = "UNEXPECTED" }
) => {
  res.status(500).send({
    data,
    code,
    success,
    message
  });
};
const BabRequest = (
  res,
  { data, message = "", success = false, code = "BAD_REQUEST" }
) => {
  res.status(400).send({
    data,
    code,
    success,
    message
  });
};

const NotFound = (
  res,
  { data, message = "", success = false, code = "NOT_FOUND" }
) => {
  res.status(404).send({
    data,
    code,
    success,
    message
  });
};

const Unauthorized = (
  res,
  { data, message = "", success = false, code = "UNAUTHORIZED" }
) => {
  res.status(401).send({
    data,
    code,
    success,
    message
  });
};

module.exports = {
  Success,
  Unexpected,
  BabRequest,
  Unauthorized,
  NotFound
};
