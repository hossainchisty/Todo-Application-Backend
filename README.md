### Todo-List-Backend-Application

#### API Routers and Methods

List all the API routes and HTTP methods used in the project, along with a brief description of what each endpoint does.

#### Task Creation and Management:

- `/api/v1/tasks` - `GET`: Get all tasks
- `/api/v1/tasks` - `POST`: Create a new task
- `/api/v1/tasks/:taskID` - `PUT`: Update task
- `/api/v1/tasks/:taskID` - `DELETE`: Delete task
- `/api/v1/tasks/:taskID` - `GET`: Mark the task as completed

#### Task Sorting and Filtering:

- `/api/v1/tasks/status/:status` - `GET`: Find tasks based on status

- `/api/v1/tasks/priority/:priority` - `GET`: Find tasks based on priority

- `/api/v1/tasks/filter?sortBy=dueDate&sortDirection=asc&title=homework&dueDate=2023-05-31&priority=high` - `GET`: Get all tasks, optionally sorted and filtered

#### Task Categories and Tags:

- `/api/v1/tag/` - `GET`: List of tags

- `/api/v1/tag/` - `POST`: Create a new tag

- `/api/v1/tag/:tagID` - `PUT`: Update tags

- `/api/v1/tag/:tagID` - `DELETE`: Delete tags

- `/api/v1/category/` - `GET`: Get all category

- `/api/v1/category/` - `POST`: Create a new category

- `/api/v1/category/:categoryID` - `PUT`: Update category

- `/api/v1/category/:categoryID` - `DELETE`: Delete category

#### User Profile:

- `/api/v1/users/register` - `POST`: Register new user

- `/api/v1/users/login` - `POST`: Authenticate a user

- `/api/v1/users/me` - `GET`: Get user data

#### Requirements:

- [x] Task Creation and Management: Users should be able to create new tasks, edit existing tasks, mark tasks as completed, and delete tasks. Each task should have a title, description, due date, and priority level.

- [x] Task Sorting and Filtering: Users should be able to sort tasks by due date, priority level, or completion status. Users should also be able to filter tasks by title, due date, or priority level.

- [x] Task Categories and Tags: Users should be able to categorise tasks into different categories, such as work, personal, or school. Users should also be able to tag tasks with keywords for easy filtering and searching.

- [x] Database: The app should use the noSQL database mongodb. And mongoose should be used for connections and schema declaration purposes.

- [x] API Endpoints: The app should provide a set of RESTful API endpoints for the frontend to interact with. The API should support CRUD operations for tasks, categories, and tags.

- [x] Error Handling: The app should handle errors gracefully and provide informative error messages to users.

- [x] Scalability: The app should be designed to scale easily, with the ability to add more servers or database instances as needed.
