# CRUD_APP

This is a crud app which uses APIs made with node.js and mongoDB for storage and it also has a user-role based access system.

### Controllers
- **TodoController**
  * This controller has the APIs related to task creation, fetching, updation and deletion.
  - Create API
    * endpoint: /todo/create
    * This API creates a task and takes input in a JSON format which has title, description, statud and assignedTo fields for a task.
    * Only an user that has role ADMIN can create it.
  - Get One API
    * endpoint: /todo/get/:id
    * This API fetches a task by its Id.
    * An user that has role ADMIN or USER can access it but an USER can access the task assigned to itself only whereas ADMIN can access any task.
  - Get All API
    * endpoint: /todo/get
    * This API fetches all the tasks.
    * An user that has role ADMIN or USER can access it but an USER can access the tasks assigned to itself only whereas ADMIN can access all of the tasks.
  - Update API
    * endpoint: /todo/put/:id
    * This API updates a task by its Id.
    * Only an user that has role ADMIN can access it and update a task by its Id.
  - delete API
    * endpoint: /todo/delete/:id
    * This API delete a task by its Id.
    * Only an user that has role ADMIN can access it and delete a task by its Id.
- **AuthController**
  * This controller has the APIs related to user registration and login.
  - Signup API
    * endpoint: /auth/signup
    * This API registers a new user and takes input in a JSON format with firstName, lastName, email, role, and password fiels.
    * This API also checks if an user already exists.
  - Login API
    * endpoint: /auth/login
    * This API registers a new user and takes input in a JSON format with email and password fiels.
    * This API also checks if an user exists or not.
### Middleware
  - **Authentication**
    * This middleware checks the token and verifies it and based on the role it gives access to APIs or give 401 Unauthorized Errror.

### I have also added a password encryption to securely save the passwords.
