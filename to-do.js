const queries = require('./database/queries.js')
const instructions = require('./instructions.js')
const pgPromise = require('pg-promise')
const pgp = pgPromise()

let databaseConnectionString
if(require.main === module) {
  databaseConnectionString = 'to_do_list'
} else {
  databaseConnectionString = 'to_do_list_test'
}
const db = pgp({
  database: databaseConnectionString
})

function toDo(query, input1, input2) {
  if(query === 'help') {
    output = ''
    for(var key in instructions) {
      output += instructions[key]
    }
    return Promise.resolve(output)
  }

  if(query === 'list') {
    return db.manyOrNone(queries.list)
      .then(function(data) {
        let output = 'ID Description \n-- -----------'
        for (i=0; i<data.length; i++) {
          output += '\n' + data[i].id + ' ' + data[i].task
        }
        return output
      })
  }

  if(query === 'add') {
    return db.none(queries.add, [input1])
      .then(function() {
        return 'Created task "' + input1 + '".'
      })
  }

  if(query === 'delete') {
    return db.none(queries.delete, [input1])
      .then(function() {
        return 'Task ' + input1 + ' has been deleted.'
      })
  }

  if(query === 'update') {
    return db.none(queries.update, [input1, input2])
      .then(function() {
        return 'Task ' + input1 + ' has been changed to "' + input2 + '".'
      })
  }

  else {
    return Promise.resolve("Command not found\nTo view instructions, type the following into your command line: \nnode to-do.js help")
  }
}

if(require.main === module) {
  const nodeQuery = process.argv[2]
  const nodeInput1 = process.argv[3]
  const nodeInput2 = process.argv[4]

  toDo(nodeQuery, nodeInput1, nodeInput2)
    .then(function(data) {
      console.log(data)
      pgp.end()
  })
}

module.exports = {
  toDo,
  db
}
