const express = require('express');
const app = express();

app.use(express.json());

const repository = require('../../database/repository');

app.get('/', (req, res) => {
    res.send(repository.findAll());
});

app.get('/dategreater', (req, res) => {
    res.send(repository.sortByDueDateGreater());
});

app.get('/dateless', (req, res) => {
    res.send(repository.sortByDueDateLess());
});

app.get('/uncompleted', (req, res) => {
    res.send(repository.uncompleted());
});

app.get('/completed', (req, res) => {
    res.send(repository.completed());
});

app.post('/', (req, res) => {
    const create_model = {
        "task_id": crypto.randomUUID(),
        "task": req.body.task,
        "description": req.body.description,
        "status": "uncompleted",
        "dueDate": req.body.dueDate
    };
    res.send(repository.add(create_model));
});

app.put('/', (req, res) => {
    const update_model = {
        "task_id": req.body.task_id,
        "task": req.body.task,
        "description": req.body.description,
        "status": req.body.status,
        "dueDate": req.body.dueDate
    };
    res.send(repository.update(update_model));
});

app.delete('/', (req, res) => {
    const delete_model = {
        "task_id": req.body.task_id
    };
    res.send(repository.remove(delete_model));
});

app.listen(3000, () => console.log("http://localhost:3000/"));