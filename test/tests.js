const expect = require('chai').expect
// you can import these things together in one statement like this:
// const {toDo, db} = require('../to-do.js')
const {toDo} = require('../to-do.js')
const {db} = require('../to-do.js')
const pgPromise = require('pg-promise')
const pgp = pgPromise()

function selectAll () {
  return db.any('SELECT id, task FROM to_do')
}

beforeEach(function() {
  // great job resetting your database before every test!
  return db.none('TRUNCATE to_do, to_do RESTART IDENTITY; INSERT INTO to_do (task) VALUES (\'first list item\')')
    // all of these pgp.end() calls in this file should be removed. You only call
    // that to close your connection to the database altogeter, and in most cases
    // you don't need to do that manually, it will happen on its own when node
    // exits
    .then(function() {
      pgp.end()
    })
})

describe("Benchmark: Command Line Todo List with SQL", function() {
  describe('"add" method adds task to to-do list', function() {
    it('adds item to empty database', function() {
      return toDo('add', 'second list item')
        .then(function() {
          return selectAll()
        })
        .then(function(data) {
          pgp.end()
          expect(data[1]).to.eql({ id: 2, task: 'second list item' })
        })
    })
    it('prints "Created task \"list item\"."', function() {
      return toDo('add', 'second list item')
        .then(function(data) {
          pgp.end()
          expect(data).to.eql("Created task \"second list item\".")
        })
    })
  })

  describe('"delete" method deletes task from to-do list', function() {
    it('deletes item from database', function() {
      return toDo('delete', 1)
        .then(function() {
          return selectAll()
        })
        .then(function(data) {
          pgp.end()
          expect(data).to.eql([])
        })
    })
    it('prints "Task 1 has been deleted."', function() {
      return toDo('delete', 1)
        .then(function(data) {
          pgp.end()
          expect(data).to.eql("Task 1 has been deleted.")
        })
    })
  })

  describe('"update" method updates task', function() {
    it('updates task 1 in database', function() {
      return toDo('update', 1, 'updated task')
        .then(function() {
          return selectAll()
        })
        .then(function(data) {
          pgp.end()
          expect(data).to.eql([ { id: 1, task: 'updated task' } ])
        })
    })
    it('prints "Task 1 has been changed to "updated task"."', function() {
      return toDo('update', 1, 'updated task')
        .then(function(data) {
          pgp.end()
          expect(data).to.eql('Task 1 has been changed to "updated task".')
        })
    })
  })

  describe('"list" method prints task list', function() {
    it('prints task list', function() {
      return toDo('list')
        .then(function(data) {
          pgp.end()
          expect(data).to.eql('ID Description \n-- -----------\n1 first list item')
        })
    })
  })
})
