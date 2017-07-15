const expect = require('chai').expect
const {toDo} = require('../to-do.js')
const {db} = require('../to-do.js')
const pgPromise = require('pg-promise')
const pgp = pgPromise()

function selectAll () {
  return db.any('SELECT id, task FROM to_do')
}

beforeEach(function(){
  return db.none('TRUNCATE to_do, to_do RESTART IDENTITY; INSERT INTO to_do (task) VALUES (\'first list item\')')
    .then(function(){
      pgp.end()
    })
})

describe("Benchmark: Command Line Todo List with SQL", function() {
  describe('"add" method adds task to to-do list', function(){
    it('adds item to empty database', function(){
      return toDo('add', 'second list item')
        .then(() => selectAll())
        .then(function(data){
          pgp.end()
          expect(data[1]).to.eql({ id: 2, task: 'second list item' })
        })
    })
    it('prints "Created task \"list item\"."', function(){
      return toDo('add', 'second list item')
        .then(function(data){
          pgp.end()
          expect(data).to.eql("Created task \"second list item\".")
        })
    })
  })

  describe('"delete" method deletes task from to-do list', function(){
    it('deletes item from database', function(){
      return toDo('delete', 1)
        .then(() => selectAll())
        .then(function(data){
          pgp.end()
          expect(data).to.eql([])
        })
    })
    it('prints "Task 1 has been deleted."', function(){
      return toDo('delete', 1)
        .then(function(data){
          pgp.end()
          expect(data).to.eql("Task 1 has been deleted.")
        })
    })
  })

  // describe('"update" method updates task', function(){
  //   it('updates task 1 in database', function(){
  //     return toDo('update', 1, 'updated task')
  //       .then(() => selectAll())
  //       .then(function(data){
  //         pgp.end()
  //         expect(data).to.eql([])
  //       })
  //   })
  //   it('prints "Task 1 has been deleted."', function(){
  //     return toDo('delete', 1)
  //       .then(function(data, moredata){
  //         pgp.end()
  //         expect(data).to.eql("Task 1 has been deleted.")
  //       })
  //   })
  // })

})
