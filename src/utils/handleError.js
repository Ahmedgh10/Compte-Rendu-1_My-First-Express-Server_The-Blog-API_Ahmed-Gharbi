// Central error mapping used by every controller catch block.
function handleError(err, res) {
  // Exercise 2: malformed ObjectId (e.g. /api/articles/abc)
  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'Invalid resource identifier (ObjectId expected)' });
  }
  // Schema validation (regex, min, enum, maxlength...)
  if (err.name === 'ValidationError') {
    const details = Object.values(err.errors).map((e) => e.message);
    return res.status(400).json({ message: 'Validation failed', errors: details });
  }
  // Duplicate key (unique index)
  if (err.code === 11000) {
    return res.status(409).json({ message: 'Duplicate value: resource already exists' });
  }
  return res.status(500).json({ message: err.message });
}

module.exports = handleError;
