INSERT INTO department (department_name)
VALUES ("Finance"),
       ("Legal"),
       ("Human Resources");

INSERT INTO roles (title, salary, department_id)
VALUES ("Financial Officer","80000",1),
       ("Attorney","75000",2),
       ("HR Officer","65000",3);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ("Heather","DuBrow",1, NULL),
       ("Gizelle","Bryant",2,1),
       ("Karen","Huger",3,1);
