const express = require('express');
const cors = require('cors');

const { createTodo, updateTodo } = require('./types');
const { Todo } = require('./db');

const app = express();
const port = 3000;

app.use(express.json());
app.use(cors());

app.post('/todo', async (req, res) => {
    const createPayload = req.body;
    const parsedPayload = createTodo.safeParse(createPayload);

    if (!parsedPayload.success) {
        res.status(411).json({
            msg: "You sent the wrong inputs"
        })
        return;
    }
    const todoExits = await Todo.findOne({
        title: createPayload.title
    })
    if (todoExits) {
        res.status(409).json("Todo exists with the given title")
        return;
    }
    await Todo.create({
        title: createPayload.title,
        description: createPayload.description,
        completed: false
    })
    res.json({
        msg: "Todo created"
    })

})

app.get('/todos', async (req, res) => {
    const todos = await Todo.find({});
    res.status(200).json({
        todos
    })
})

app.put('/completed', async (req, res) => {
    const updatePayload = req.body;
    const parsedUpdatePayload = updateTodo.safeParse(updatePayload);

    if (!parsedUpdatePayload.success) {
        res.status(411).json({
            msg: "You sent wrong input"
        })
        return;
    }

    await Todo.updateOne({
        title: updatePayload.title
    }, {
        completed: true
    })
    res.status(200).json({
        msg: "Todo marked as complted"
    })
})

app.post('/delete', async (req, res) => {
    const updatePayload = req.body;
    const parsedUpdatePayload = updateTodo.safeParse(updatePayload);

    if (!parsedUpdatePayload.success) {
        res.status(411).json({
            msg: "You sent wrong input"
        })
        return;
    }

    await Todo.deleteOne({
        title: updatePayload.title
    })
    res.status(200).json({
        msg: "Todo deleted"
    })
})


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})