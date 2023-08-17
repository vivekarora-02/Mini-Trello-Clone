import React from 'react';
import 'bootstrap/dist/css/bootstrap.css';

export default function TaskDetail(props) {
    const { closeModalTask, taskTitle, taskDescription, taskDueDate, deleteTask, editTask } = props;

    // Retrieve task data from localStorage
    const storedTaskTitle = localStorage.getItem('storedTaskTitle') || taskTitle;
    const storedTaskDescription = localStorage.getItem('storedTaskDescription') || taskDescription;
    const storedTaskDueDate = localStorage.getItem('storedTaskDueDate') || taskDueDate;

    // Function to handle edit button click and update task data in localStorage
    const handleEdit = () => {
        localStorage.setItem('storedTaskTitle', storedTaskTitle);
        localStorage.setItem('storedTaskDescription', storedTaskDescription);
        localStorage.setItem('storedTaskDueDate', storedTaskDueDate);

        editTask();
    };

    return (
        <div>
            <h2>{storedTaskTitle}</h2>
            <h4>Description</h4>
            <h6>{storedTaskDescription}</h6>
            <h4>Due date</h4>
            <h6>{storedTaskDueDate}</h6>
            <h4>Attachments</h4>

            <button onClick={handleEdit} className="btn btn-primary">Edit</button>
            <button onClick={closeModalTask} className="btn btn-link">Cancel</button>
            <button onClick={deleteTask} className="btn btn-danger btn-sm">Delete</button>
        </div>
    );
}
