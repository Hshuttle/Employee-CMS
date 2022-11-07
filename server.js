const inquirer = require("inquirer");
const mysql = require("mysql2");
const table = require("console.table");

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "Hunt2342!",
    database: "cms_db",
  },
  console.log(`Connected to the classlist_db database.`)
);

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
    name: "branchPrompt",
  },
];

function prompt() {
  inquirer.prompt(branchPrompt).then((answers) => {
    if (answers.branchPrompt === "View All Employees") {
      viewEmployees();
    } else if (answers.branchPrompt === "View All Roles") {
      viewRoles();
    } else if (answers.branchPrompt === "View All Departments") {
      viewDepartment();
    } else if (answers.branchPrompt === "Add Department") {
      addDepartment();
    } else if (answers.branchPrompt === "Add Employee") {
      addEmployee();
    } else if (answers.branchPrompt === "Add Role") {
      addRole();
    } else {
      return console.log("END");
    }
  });
}

function viewEmployees() {
  db.promise()
    .query(
      "SELECT CONCAT(employee.first_name,' ',employee.last_name) AS Name, roles.title AS Title, roles.salary AS Salary, department.department_name AS Department, CONCAT(manager.first_name,' ',manager.last_name) AS Manager FROM employee LEFT JOIN roles ON employee.role_id = roles.id LEFT JOIN department ON roles.department_id = department.id LEFT JOIN employee manager ON manager.id = employee.manager_id"
    )
    .then(([response]) => {
      console.table(response);
      prompt();
    });
}
function viewRoles() {
  db.promise()
    .query(
      "SELECT roles.title AS Title, roles.salary AS Salary, department.department_name AS Department FROM roles LEFT JOIN department ON roles.department_id = department.id"
    )
    .then(([response]) => {
      console.table(response);
      prompt();
    });
}
function viewDepartment() {
  db.promise()
    .query("SELECT * FROM department")
    .then(([response]) => {
      console.table(response);
      prompt();
    });
}

function addDepartment() {
  inquirer
    .prompt({
      type: "input",
      name: "name",
      message: "What is the name of the new department",
    })
    .then((answers) => {
      db.promise()
        .query("INSERT INTO department SET ?", {
          department_name: answers.name,
        })
        .then(([response]) => {
          if (response.affectedRows > 0) {
            viewDepartment();
          } else {
            console.log("failed to create department");
            prompt();
          }
        });
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "title",
        message: "What is the new roles title?",
      },
      {
        type: "input",
        name: "salary",
        message: "What is the new roles salary?",
      },
    ])
    .then((answers) => {
      db.promise()
        .query("INSERT INTO roles SET ?", {
          title: answers.title,
          salary: answers.salary,
        })
        .then(([response]) => {
          if (response.affectedRows > 0) {
            viewRoles();
          } else {
            console.log("failed to create new role");
            prompt();
          }
        });
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        type: "input",
        name: "first",
        message: "What is the new employees first name?",
      },
      {
        type: "input",
        name: "last",
        message: "What is the new employees last name?",
      },
    ])
    .then((answers) => {
      db.promise()
        .query("INSERT INTO employee SET ?", {
          first_name: answers.first,
          last_name: answers.last,
        })
        .then(([response]) => {
          if (response.affectedRows > 0) {
            viewEmployees();
          } else {
            console.log("failed to create new employee");
            prompt();
          }
        });
    });
}

prompt();
