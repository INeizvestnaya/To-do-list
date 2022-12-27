# To-do list project

This is to-do list, where you can create tasks for any day and 
check and uncheck this tasks.

## Task

https://drive.google.com/file/d/18I1PxOxZn2lwm__YeOtMNoWeiXygKwwN/view

## How to run the app

If you don't have git, install it.

Clone the repository.

If you don't have node.js, install it from the official site.

Type

```
npm install
```

to install all the dependencies of the project.

This project uses firebase as a storage of tasks.

You should write down your Firebase config.

Register on firebase.

Find .env.example file, use it as a template.

(This file contains my data)

Create .env file near it and write your firebase config data there in the same way as it's written in the example file.

Then type 

```
npm start
```

in the console, directed to the root folder of the project.

This command will run the app and open it in your browser.

The last step is registration in the app when you run it.

## Database snapshot

Data in this firebase project in stored in Firestore Database in "tasks" collection.

Collection includes docs for every days which have tasks. DOcs are named as days DD.MM.YYYY.

Each doc contains fields named as tasks names which contains descriptions of the tasks
in the "description" field and "done" fields.

There are 3 actions in database. They are stored in utils/firestoreActions.js file

### toggleCheckTask

It checks and unchecks the task.

### deleteTask

It deletes the task.

### addTask

It adds or updates the task.

The logic may be unclear at first. It also deletes some task.

It is done because it is used in updating, and when you change the name of the task
you need to delete the task with the previous name to avoid duplications.

## Application stack

All used libraries are listed in dependencies and devDependencies in package.json file.

### React

A JavaScript library for creating user interfaces.

### Material UI (MUI)

A library for react which simplifies creating UI and styles. It defines components such as buttons, labels, menus, icons.

### Redux

A state management system for react. Helps to store react state data in one place and manage it easily.

### React-toastify

A library for creating notifications when an error occurs during authorization.

### Prop-types

A library for checking props of react components.

### Eslint

A JavaScript linter. It helps to write cleaner code, checks it for the mistakes and enforces correct code style.

### Prettier

A code formatter to write code in same style everywhere.

### Dayjs

A library, used for formatting date with Material UI.

## Folders of the application

### .husky

Configuration files for a pre-push hook.

It doesn't allow you to push anything when there are EsLint errors in the project.

### node_modules

Modules of the app. They are installed with npm and are ignored by git.

### src

Source folder of application and configuration files. It contains files written by developers of the app.

Contains JavaScript (.js, .jsx) files. .jsx files are used for react library.

### src/pages 

Contains pages (url routed) of the application.

### src/components

Contains other react components.

### src/redux

Contains redux logic.

### src/utils

Contains different helper functions.
