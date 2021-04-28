Comandos MySQL 



[MySQL](https://dev.mysql.com/doc/mysql-shell/8.0/en/mysql-shell-commands.html)

Para crear una baase de datos nueva usamos el comando 



# Crear 

```
CREATE DATABASE databasename_db;
```

```
CREATE DATABASE  IF NOT EXIST databasename_db;
```


# Usar 

```
USE DATABASE databasename_db;
```


# Borrar 
```
DROP DATABASE databasename;
```

# Crear una Tabla  :


Ejemplo 

```
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


```
# Tirar una tabla 

```
DROP TABLE table_name;
 
```

# Insertar 

```
INSERT INTO `DB_name`.`table_name` (`ID_column`, `name_column`) VALUES ('1', 'Oregano');
```


```
ALTER DATABASE - modifies a database
```


The following constraints are commonly used in SQL:

NOT NULL - Ensures that a column cannot have a NULL value
UNIQUE - Ensures that all values in a column are different
PRIMARY KEY - A combination of a NOT NULL and UNIQUE. Uniquely identifies each row in a table
FOREIGN KEY - Prevents actions that would destroy links between tables
CHECK - Ensures that the values in a column satisfies a specific condition
DEFAULT - Sets a default value for a column if no value is specified
CREATE INDEX - Used to create and retrieve data from the database very quickly
