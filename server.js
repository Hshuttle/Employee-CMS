const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");

const branchPrompt = [
  {
    type: "list",
    message: "What would you like to do?",
    choices: [
      "View All Employees",
      "Add Employee",
      "Update Employee Role",
      "View All Roles",
      "Add Role",
      "View All Departments",
      "Add Department",
      "Quit-Nothing Else To Do",
    ],
    name: "branchprompt",
  },
];

function prompt() {
  inquirer.prompt(branchPrompt).then((answers) => console.log(answers));
}

prompt();
