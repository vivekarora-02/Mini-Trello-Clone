import React from 'react';

export default function EditTask(props) {
    const { currentTitleTask, currentDescriptionTask, deleteTask, updateTask, cancelTask, onChangeTask, onChangeTaskDescription } = props;

    function handleSubmit(e) {
        e.preventDefault();

        updateTask(currentTitleTask, currentDescriptionTask);

        // Retrieve existing task data from localStorage
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Find the index of the task being edited
        const taskIndex = existingTasks.findIndex(task => task.id === props.taskID);

        // Update the task data in the array
        existingTasks[taskIndex] = {
            ...existingTasks[taskIndex],
            title: currentTitleTask,
            description: currentDescriptionTask
        };

        // Save the updated task data back to localStorage
        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        cancelTask(e);
    }

    function handleDelete(e) {
        e.preventDefault();

        // Retrieve existing task data from localStorage
        const existingTasks = JSON.parse(localStorage.getItem('tasks')) || [];

        // Find the index of the task being deleted
        const taskIndex = existingTasks.findIndex(task => task.id === props.taskID);

        // Remove the task from the array
        existingTasks.splice(taskIndex, 1);

        // Save the updated task data back to localStorage
        localStorage.setItem('tasks', JSON.stringify(existingTasks));

        deleteTask();
    }

    return (
        <form>
            <input onChange={onChangeTask} value={currentTitleTask} className="form-control" type="text" placeholder="Title" />
            <div className="form-group">
                <textarea onChange={onChangeTaskDescription} value={currentDescriptionTask} className="form-control" name="" id="" rows="5" placeholder="Description" />
            </div>
            <input type="file" />
            <button onClick={handleSubmit} className="btn btn-primary">Update</button>
            <button onClick={cancelTask} className="btn btn-link">Cancel</button>
            <button onClick={handleDelete} className="btn btn-danger btn-sm">Delete</button>
        </form>
    );
}
