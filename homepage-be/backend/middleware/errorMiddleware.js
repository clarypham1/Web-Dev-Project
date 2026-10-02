// runs when no route matched
const unknownEndpoint = (req, res) => {
  res.status(404).json({ error: "Unknown endpoint" });
};

// runs when a route throws / calls next(error)
const errorHandler = (error, req, res, next) => {
  console.error(error.message);

  // invalid MongoDB id
  if (error.name === "CastError") {
    return res.status(400).json({ error: "Malformed id" });
  }

  // mongoose schema validation failed
  if (error.name === "ValidationError") {
    return res.status(400).json({ error: error.message });
  }

  res.status(500).json({ error: "Something went wrong on the server" });
};

export { unknownEndpoint, errorHandler };
