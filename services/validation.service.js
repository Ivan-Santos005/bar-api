const requireFields = (data, fields) => {
  const missing = fields.filter((field) => data[field] == null);
  if (missing.length) {
    throw { status: 400, message: `Faltan campos requeridos: ${missing.join(', ')}` };
  }
};

const buildPatchQuery = (table, data, allowedFields, idField, idValue) => {
  const updates = Object.keys(data).filter((key) => allowedFields.includes(key));
  if (updates.length === 0) return null;
  const query = `UPDATE ${table} SET ${updates.map((key) => `${key}=?`).join(', ')} WHERE ${idField}=?`;
  const values = [...updates.map((key) => data[key]), idValue];
  return { query, values };
};

module.exports = { requireFields, buildPatchQuery };