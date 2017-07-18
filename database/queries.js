// instead of just putting the raw SQL queries here I think it would be even better
// to export from this file functions that wrap and execute thse queries like:
//
// function add (taskName) {
//   return db.none(
//     'INSERT INTO to_do (task) VALUES ($1)',
//     [taskName]
//   ).then(() => taskName)
// }
//
// ...etc

const queries = {
  add: 'INSERT INTO to_do (task) VALUES ($1)',
  list: 'SELECT * FROM to_do ORDER BY id',
  update: 'UPDATE to_do SET task = $2 WHERE id = $1',
  delete: 'DELETE FROM to_do WHERE id = $1',
  truncate: 'TRUNCATE to_do, to_do RESTART IDENTITY'
}

module.exports = queries
