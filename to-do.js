const queries = require('./database/queries.js')
const pgPromise = require('pg-promise')
const pgp = pgPromise()
const db = pgp({
	database: 'to_do_list'
})

const instructions = {
  list:'\nLIST\nTo see your to-do list, use the "list" command.\nExample: \nnode to-do.js list\n',
  add: '\nADD\nTo add items to your to-do list, use the "add" command followed by the task you want to add.\nExample: \nnode to-do.js add "This is where your task goes"\n',
  update: '\nUPDATE\nTo update items in your to-do list, use the "update" command followed by the id of the task you want to change and then the updated task.\nExample : \nnode to-do.js update 1 "This is the updated task"\n',
  delete: '\nDELETE\nTo delete items from your to-do list, use the "delete" command followed by the ID of the task you want to delete.\nExample: \nnode to-do.js delete 1\n'
}

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
      .then(function(data){
        let output = 'ID Description \n-- -----------'
        for (i=0; i<data.length; i++) {
          output += '\n' + data[i].id + ' ' + data[i].task
        }
        return output
      })
      .catch(function(err) {
        return 'Error'
      })
  }

  if(query === 'add') {
    return db.none(queries.add, [input1])
      .then(function() {
        return 'Created task "' + input1 + '".'
      })
      .catch(function(error) {
        return 'Error'
      })
  }

  if(query === 'delete') {
    return db.none(queries.delete, [input1])
      .then(function(){
        return 'Task ' + input1 + ' has been deleted.'
      })
      .catch(function(error) {
        return 'Error'
      })
  }

  if(query === 'update') {
    return db.none(queries.update, [input1, input2])
      .then(function(){
        return 'Task ' + input1 + ' has been changed to "' + input2 + '".'
      })
      .catch(function(error) {
        return 'Error'
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
    .then((data) => {
      console.log(data)
      process.exit(0)
  })
}
