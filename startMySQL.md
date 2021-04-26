Comandos MySQL 

http://github.com - automatic!
[GitHub](http://github.com)

Para crear una baase de datos nueva usamos el comando 




Commands
SELECT - extracts data from a database
UPDATE - updates data in a database
DELETE - deletes data from a database
INSERT INTO - inserts new data into a database
CREATE DATABASE - creates a new database
ALTER DATABASE - modifies a database
CREATE TABLE - creates a new table
ALTER TABLE - modifies a table
DROP TABLE - deletes a table
CREATE INDEX - creates an index (search key)
DROP INDEX - deletes an index


The following constraints are commonly used in SQL:

NOT NULL - Ensures that a column cannot have a NULL value
UNIQUE - Ensures that all values in a column are different
PRIMARY KEY - A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table
FOREIGN KEY - Prevents actions that would destroy links between tables
CHECK - Ensures that the values in a column satisfies a specific condition
DEFAULT - Sets a default value for a column if no value is specified
CREATE INDEX - Used to create and retrieve data from the database very quickly



# Crear 

```
CREATE DATABASE databasename;
```
Ejemplo 

```
CREATE DATABASE jr_hidroponica_db;
```

# Borrar 
```
DROP DATABASE databasename;
```

# Crear una Tabla  :


Ejemplo 

CREATE TABLE Seeds
(
seedID int,
celda int,
seedName varchar(255),
Date_start varchar(255),
Date_colect varchar(255),
PH varchar(255),
Humedity varchar(255),
Temperature  varchar(255)
);


# Tirar una tabla 

DROP TABLE table_name;





Ejemplos 


`<addr>` element here instead.



```javascript
function fancyAlert(arg) {
  if(arg) {
    $.facebox({div:'#foo'})
  }
}
```


Tabla 

First Header | Second Header
------------ | -------------
Content from cell 1 | Content from cell 2
Content in the first column | Content in the second column
