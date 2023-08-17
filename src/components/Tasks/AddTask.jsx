import React from 'react';

export default function AddTaskForm(props) {
    const { cancelAddTask, createTask } = props;

    function handleSubmit(event) {
        event.preventDefault();
        const input = event.target.querySelector('textarea');
        const text = input.value;
        if (!text) return;

        input.value = '';

        const date = Date.now();

        const item = {
            id: date,
            title: text,
            description: '',
            "due date": date,
            date,
            attachments: []
        };

        // Retrieve existing task data from localStorage
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];
        // Add the new task to the array
        existingTasks.push(item);
        // Save the updated task data back to localStorage
        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        createTask(item);
        cancelAddTask(event);
    }

    return (
        <form onSubmit={handleSubmit}>
            <div className="form-group">
                <textarea className="form-control" name="" id="" rows="5" placeholder="New task"></textarea>
            </div>
            <button className="btn btn-primary">Add</button>
            <button onClick={cancelAddTask} className="btn btn-link">Cancel</button>
        </form>
    );
}
