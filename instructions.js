const instructions = {
  list:'\nLIST\nTo see your to-do list, use the "list" command.\nExample: \nnode to-do.js list\n',
  add: '\nADD\nTo add items to your to-do list, use the "add" command followed by the task you want to add.\nExample: \nnode to-do.js add "This is where your task goes"\n',
  update: '\nUPDATE\nTo update items in your to-do list, use the "update" command followed by the id of the task you want to change and then the updated task.\nExample : \nnode to-do.js update 1 "This is the updated task"\n',
  delete: '\nDELETE\nTo delete items from your to-do list, use the "delete" command followed by the ID of the task you want to delete.\nExample: \nnode to-do.js delete 1\n'
}

module.exports = instructions
