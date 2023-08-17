import React, { Component } from 'react'
import TaskList from '../Tasks/TaskList'
import EditGroup from './EditGroup'

export default class GroupItem extends Component {
    state = {
        isGroupEdit: false,
        value: null,
    }

    componentDidMount() {
        const storedValue = localStorage.getItem(`groupTitle_${this.props.groupID}`);
        if (storedValue) {
            this.setState({ value: storedValue });
        }
    }

    handleEditGroup = () => {
        if (!this.props.isUserSignIn) return;

        this.setState({
            isGroupEdit: true,
        })
    }

    handleSaveGroup = (newValue) => {
        this.setState({
            isGroupEdit: false,
            value: newValue,
        });
        localStorage.setItem(`groupTitle_${this.props.groupID}`, newValue);
    }

    onClickCancel = (event) => {
        event.preventDefault();

        this.setState({ isGroupEdit: false })
    }

    render() {
        const { groupID, onClickGroup } = this.props;
        const { isGroupEdit, value } = this.state;
        return (
            <div onClick={onClickGroup.bind(this, groupID)} className="groups__item" id={groupID}>
                <header className="title">
                    {isGroupEdit
                        ? <EditGroup
                            value={value || this.props.groupTitle}
                            onSave={this.handleSaveGroup}
                            onCancel={this.onClickCancel}
                        />
                        : <h5 onClick={this.handleEditGroup}>{value || this.props.groupTitle}</h5>
                    }
                </header>
                <TaskList {...this.props} />
            </div>
        )
    }
}
