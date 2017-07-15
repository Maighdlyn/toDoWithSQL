const expect = require('chai').expect
const {toDo} = require('../to-do.js')
const {db} = require('../to-do.js')
const pgPromise = require('pg-promise')
const pgp = pgPromise()

function selectAll () {
  return db.any('SELECT id, task FROM to_do')
}

beforeEach(function(){
  return db.none('TRUNCATE to_do, to_do RESTART IDENTITY')
    .then(function(){
      pgp.end()
    })
})

describe("Benchmark: Command Line Todo List with SQL", function() {
  describe('"Add" method adds task to to-do list', function(){
    it('adds item to empty database', function(){
      return toDo('add', 'list item')
        .then(() => selectAll())
        .then(function(data, moredata){
          pgp.end()
          expect(data).to.eql([ { id: 1, task: 'list item' } ])
        })
    })
    it('prints "Created task \"list item\"."', function(){
      return toDo('add', 'list item')
        .then(function(data, moredata){
          pgp.end()
          expect(data).to.eql("Created task \"list item\".")
        })
    })
  })
})

// describe("Benchmark: Command Line Todo List with SQL", function() {
//   it("'add' function adds tasks to list", function() {
//     toDo('add', 'list item')
//       .then(function(){
//         expect().to.equal(2)
//         done()
//       })
//   })

//   it("does stuff", function(){
//     expect(1).to.equal(2)
//   })
// })




// toDo('truncate')
// .then(() => {
//   // console.log(data)
//   process.exit(0)
// })
//
// toDo('add', '?')
// .then(() => {
//   console.log('line 25')
//   process.exit(0)
// })
// .then(console.log('line 28'))

//
