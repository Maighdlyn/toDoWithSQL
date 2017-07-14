const queries = {
  add: 'INSERT INTO to_do (task) VALUES ($1)',
  list: 'SELECT * FROM to_do ORDER BY id',
  update: 'UPDATE to_do SET task = $2 WHERE id = $1',
  delete: 'DELETE FROM to_do WHERE id = $1',
  idFromTask: 'SELECT id FROM to_do WHERE task = $1'
}

module.exports = queries
