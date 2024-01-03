const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://admin:FSzAE8q87LSd2faf@cluster0.uof1tyg.mongodb.net/TodoApp')

const TodoSchema = mongoose.Schema({
    title: String,
    description: String,
    completed: Boolean
})

const Todo = mongoose.model('Todos', TodoSchema);

module.exports = ({
    Todo
})