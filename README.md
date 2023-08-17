# Mini Trello Clone

Welcome to the Mini Trello Clone project! This repository contains the frontend implementation of a simplified Trello clone, emphasizing functionality and code organization. While the visual design might differ, the main goal is to showcase how components are structured and how features are handled.


![Screenshot](https://github.com/vivekarora-02/Mini-Trello-Clone/blob/master/Image.png)

## Project Scope

The objective of this project is to create a basic version of Trello with the following key features:

- Users can create boards.
- Boards consist of stages like Todo, Doing, and Done.
- Stages contain tasks that can be moved within the same stage or across stages.

## Implemented Functionality

The frontend of the Mini Trello Clone demonstrates the following functionalities:

- Display a task board, grouping tasks based on their respective stages.
- Enable users to add new groups (boards).
- Allow users to create tasks within each group.
- Implement drag-and-drop functionality to manage tasks within and between stages.
- Data Persistence: Upon refreshing the page, the data remains intact, ensuring that tasks and stages are preserved.

## Future Scenarios

### Scenario 1: User-Customized Stages

#### Database Changes:

1. **Stages Table:**
   - Introduce a `stage_id` field in the `boards` table to associate stages with boards.
   - Include columns such as `name`, `position`, and `color` to facilitate customizable stage properties.

#### API Changes:

1. **API Endpoints:**
   - Add an endpoint to create new stages for specific boards.
   - Enhance an endpoint to update existing stage attributes.

2. **Updated API Endpoints:**
   - Adjust the task details endpoint to include information about stages.
   - Modify the task update endpoint to accommodate potential stage changes.

### Scenario 2: Task Comments

#### Database Changes:

1. **Comments Table:**
   - Create a new `comments` table with fields like `comment_id`, `task_id`, `user_id`, `text`, and `timestamp`.

#### API Changes:

1. **API Endpoints:**
   - Integrate an endpoint to post comments for tasks.
   - Implement an endpoint to retrieve comments associated with specific tasks.

2. **Updated API Endpoints:**
   - Revise the task details endpoint to encompass comments.
   - Enhance the task update endpoint to handle comment-related actions.

## Error Handling

- Frontend Validation: Employ input validation to prevent erroneous data submissions.
- API Responses: Manage various API response statuses and present user-friendly error messages.
- Network Errors: Address network-related issues gracefully and offer guidance for retrying.
- Server Errors: Display comprehensive error messages and options to retry later.
- Logging and Monitoring: Set up logging and monitoring systems to capture errors and exceptions.
- Feedback Mechanism: Implement user reporting mechanisms for errors or unexpected behavior.
- Graceful Degradation: Plan for situations where features may not function due to errors.

Please note that the primary focus of this project is to showcase code structure and functionality rather than visual design. The README provides an overview of the project's scope, implemented features, and considerations for potential scenarios and error handling.
