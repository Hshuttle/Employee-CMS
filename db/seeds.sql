INSERT INTO department (id, department_name)
VALUES ("001","Finance"),
       ("002","Legal"),
       ("003","Human Resources");

INSERT INTO roles (id, title, salary, department_name)
VALUES ("001","Financial Officer","80000","Finance"),
       ("002","Attorney","75000","Legal"),
       ("003","HR Officer","65000","Human Resources");

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES ("001","Heather","DuBrow","001", "001"),
       ("002","Gizelle","Bryant","002","002"),
       ("003","Karen","Huger","003","003");
