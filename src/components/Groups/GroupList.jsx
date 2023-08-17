import React, { Component } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import Sortable from 'sortablejs';

import Group from './Group';
import AddGroup from './AddGroup';
import AddTaskForm from '../Tasks/AddTask';

export default class Dashboard extends Component {
    state = {
        data: [],
        currentIDGroup: null,
        isAddGroup: false,

        currentIndexGroup: null,
        currentTitleGroup: null,
        currentIDTask: null,
        currentIndexTask: null,
        currentTitleTask: null,
        currentDescriptionTask: '',

    }

    handleClickAddTask = () => {
        if (!this.props.isUserSignIn) return;

        this.setState({ isAddTask: true });
    };

    handleClickGroup = (id) => {
        if (id === this.state.currentIDGroup) return
        
        const {currentIndexGroup} = this.findIndex(id);
        const currentTitleGroup = this.state.data[currentIndexGroup].title;

        this.setState({
            currentIDGroup: id,
            currentIndexGroup,
            currentTitleGroup
        })
    }

    handleClickTask = (idTask, idGroup) => {
        if (idTask === this.state.currentIDTask) return
        
        const {currentIndexTask, currentIndexGroup} = this.findIndex(idGroup, idTask);
        const currentTitleTask = this.state.data[currentIndexGroup].tasks[currentIndexTask].title;

        this.setState({
            currentIDTask: idTask,
            currentIndexTask,
            currentTitleTask
        })
    }


    handleClickAddGroup = (e) => {
        if (!this.props.isUserSignIn) return;
        
        this.setState({ isAddGroup: true })
    };
    
    findIndex = (idGroup, idTask) => {
        let currentIndexGroup;
        let currentIndexTask;
        
        this.state.data.forEach((item, index) => {
            if (item.id === idGroup) {
                currentIndexGroup = index
                
                item.tasks.forEach((task, index) => {
                    if (task.id === idTask) {
                        currentIndexTask = index;
                    }
                })
            }
        });
        
        return {currentIndexGroup, currentIndexTask};
    }
    componentDidMount() {
        const storedData = localStorage.getItem('groupData');
        if (storedData) {
            this.setState({ data: JSON.parse(storedData) });
        }
    }
    createGroup = (item) => {
        this.state.data.push(item);

        // Save updated data to localStorage
        localStorage.setItem('groupData', JSON.stringify(this.state.data));

        this.setState({
            data: this.state.data,
            isAddGroup: false,
        });
    }

    updateGroup = (title) => {
        // ...updateGroup logic
        const groupClone = this.state.data[this.state.currentIndexGroup];
        groupClone.title = title;
        this.state.data.splice(this.state.currentIndexGroup, 1, groupClone);

        // Save updated data to localStorage
        localStorage.setItem('groupData', JSON.stringify(this.state.data));

        this.setState({ data: this.state.data });
    }

    deleteGroup = () => {
        // ...deleteGroup logic
        this.state.data.splice(this.state.currentIndexGroup, 1);

        // Save updated data to localStorage
        localStorage.setItem('groupData', JSON.stringify(this.state.data));

        this.setState({ data: this.state.data });
    }

    createTask = (item) => {
        // ...createTask logic
        this.state.data[this.state.currentIndexGroup].tasks.push(item);

        // Save updated data to localStorage
        localStorage.setItem('groupData', JSON.stringify(this.state.data));

        this.setState({ data: this.state.data });
    }

    updateTask = (title, description) => {
        // ...updateTask logic
        const taskClone = this.state.data[this.state.currentIndexGroup].tasks[this.state.currentIndexTask];
        taskClone.title = title;
        taskClone.description = description;
        this.state.data[this.state.currentIndexGroup].tasks.splice(this.state.currentIndexTask, 1, taskClone)
        // Save updated data to localStorage
        localStorage.setItem('groupData', JSON.stringify(this.state.data));

        this.setState({ data: this.state.data });
    }

    deleteTask = () => {
        // ...deleteTask logic
        this.state.data[this.state.currentIndexGroup].tasks.splice(this.state.currentIndexTask, 1);

        // Save updated data to localStorage
        localStorage.setItem('groupData', JSON.stringify(this.state.data));

        this.setState({ data: this.state.data });
    }

    sortableContainersDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {
                animation: 150,
                handle: ".title",
            };
            Sortable.create(componentBackingInstance, options);
        }
    };

    sortableGroupDecorator = (componentBackingInstance) => {
        if (componentBackingInstance) {
            let options = {
                animation: 150,
                draggable: ".tasks__item",
                group: "shared",
            };
            Sortable.create(componentBackingInstance, options);
        }
    };

    handleClickAddGroup = () => {
        if (!this.props.isUserSignIn) return;
        
        this.setState({ isAddGroup: true });
    };

    render() {
        const groupElement = this.state.data.map(group => (
            <Group
                {...this.props}
                sortableGroupDecorator={this.sortableGroupDecorator}
                onClickGroup={this.handleClickGroup}
                onClickTask={this.handleClickTask}

                key={group.id} 
                groupID={group.id} 
                groupTitle={group.title} 
                groupTasks={group.tasks}
                
                currentTitleGroup={this.state.currentTitleGroup}
                updateGroup={this.updateGroup}
                deleteGroup={this.deleteGroup}
                onChangeGroup={ ({ target }) => this.setState({currentTitleGroup: target.value}) }

                currentTitleTask={this.state.currentTitleTask}
                currentDescriptionTask={this.state.currentDescriptionTask}
                createTask={this.createTask}
                updateTask={this.updateTask}
                deleteTask={this.deleteTask}
                onChangeTask={ ({ target }) => this.setState({currentTitleTask: target.value}) }
                onChangeTaskDescription={ ({ target }) => this.setState({currentDescriptionTask: target.value}) }

            />
        ));

        return (
            <div className="dashboard container-fluid">
                <div className="groups" ref={this.sortableContainersDecorator}>

                    {groupElement}

                    <div className="groups__item">
                        <div className="inner">
                            {this.state.isAddGroup ? (
                                <AddGroup
                                    cancelAddGroup={() => this.setState({ isAddGroup: false })}
                                    createGroup={this.createGroup}
                                />
                            ) : (
                                <div onClick={this.handleClickAddGroup}>Add a new group...</div>
                            )}
                            {this.state.isAddTask && (
                                <AddTaskForm
                                    groupID={this.state.currentIDGroup} // Pass the current group ID
                                    createTask={this.createTask}
                                    cancelAddTask={() => this.setState({ isAddTask: false })}
                                />
                            )}
        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
