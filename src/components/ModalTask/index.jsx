import React, { Component } from 'react';
import { createPortal } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.css';
import './style.css';

import EditTask from '../Tasks/EditTask';
import TaskDetail from '../Tasks/TaskDetail';

export default class TaskModalPortal extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isTaskEdit: false,
        };

        this.root = document.createElement('div');
        this.root.className = "modal-task container-fluid d-flex justify-content-center";
        document.body.appendChild(this.root);
    }

    componentDidMount() {
        const storedIsTaskEdit = localStorage.getItem('storedIsTaskEdit') === 'true';
        this.setState({ isTaskEdit: storedIsTaskEdit });
    }

    componentWillUnmount() {
        document.body.removeChild(this.root);
    }

    editTask = () => {
        this.setState({ isTaskEdit: true });
        localStorage.setItem('storedIsTaskEdit', 'true');
    }

    deleteTask = (event) => {
        event.preventDefault();

        this.props.closeModalTask();
        this.props.deleteTask();
    }

    cancelTask = (event) => {
        event.preventDefault();

        this.setState({ isTaskEdit: false });
        localStorage.setItem('storedIsTaskEdit', 'false');
    }

    render() {
        return createPortal(
            <div className="card m-5 p-3 col-md-5 text-center">
                {this.state.isTaskEdit
                    ? <EditTask 
                        {...this.props}
                        cancelTask={this.cancelTask}
                    />
                    : <TaskDetail 
                        {...this.props}
                        editTask={this.editTask}
                        deleteTask={this.deleteTask}
                    />
                }
                {this.props.children}
            </div>,
            this.root
        );
    }
}
