INSERT INTO department
    (name)
VALUES
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO role
    (title, salary, department_id)
VALUES
    ('Sales Lead', 100000, 1),
    ('Salesperson', 80000, 1),
    ('Lead Engineer', 150000, 2),
    ('Software Engineer', 120000, 2),
    ('Account Manager', 160000, 3),
    ('Accountant', 125000, 3),
    ('Legal Team Lead', 250000, 4),
    ('Lawyer', 190000, 4);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Takezo', 'Shinmen', 1, NULL),
    ('Musashi', 'Miyamoto', 2, 1),
    ('Amelia', 'Watson', 3, NULL),
    ('Subaru', 'Natsuki', 4, 3),
    ('Yuki', 'Makoto', 5, NULL),
    ('Gura', 'Shark', 6, 5),
    ('Calliope', 'Mori', 7, NULL),
    ('Yu', 'Narukami', 8, 7),
    ('Kazuma', 'Kiryu', 3, 1);
