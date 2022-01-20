# Tasks ToDo

A cloud-based todo management application

## Live Preview 
[Tasks ToDo](http://178.128.85.236)
\
*It will take a few seconds for the first load*

### Tech Stack
- React with Material UI
- Node and express framework
- MongoDB atlas as database service
- JWT for user authentication
- Redux for state management 

### How To Use
- To use the application, User first need to register with the service. Registered user can login to the app using registered credentials. After registering with email, user can use the google account with respective email to login the system without entering credentials.
- At the homepage User can **add todos**, **edit todos**, **delete todos** and change todo status to **Todo**, **In progress** and **Done**. With the changing todo status, todo color will be changed for better UX.
- User can access the service using any device. (responsive UI)

---
### If you want to make a working app from code,

1. Clone the repository
2. Navigate to both `client` and `server` directories and Use the node package manager to install node modules

```bash
npm install 
```
3. create **.env** file in server root directory, add **MONGODB_URL** key with working Mongo db URI value and **JWT_SECRET** key with strong secret value
4. change the **BaseURL** value of config file in client directory to working host.  `eg : http://localhost:3000`
5. Create google OAuth API credentials, add **Authorized JavaScript origins** and **Authorized redirect URIs** as previous host address, then get the client ID and replace the clientId of **GoogleLogin** in the `client/pages/Login.jsx` page.

---

\
**Thank you and stay safe** :relaxed:



