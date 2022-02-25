# BookWorms

An online readers' community where users can customize their "BookShelf" with books they like, follow like-minded readers and keep up with their favorite authors. Smart suggestions for new books, authors and readers make BookWorms feel more personalized. Users can also share their own wallposts and reviews, and interact with others' posts to boost the community. 
<br />
<br />
<details open>
<summary>Table of Content</summary>
<br>
 
 - [BookWorms](#bookworms)
  * [Authors](#authors)
  * [Supervisor](#supervisor)
  * [Built With](#built-with)
  * [Get Started](#get-started)
    + [Prerequisite Software:](#prerequisite-software-)
    + [Getting Our Git Repository](#getting-our-git-repository)
    + [Database Setup](#database-setup)
      - [Disclaimers:](#disclaimers-)
    + [.env file](#env-file)
    + [Running the Project:](#running-the-project-)

</details>


## Authors
- [Tanjeem Azwad Zaman](https://github.com/Tanjeem29)
- [MD Rownok Zahan Ratul](https://github.com/RownokRatul)

## Supervisor
- [Tahmid Hasan](https://tahmid04.github.io/)
    -  Lecturer, Department of Computer Science and Engineering
    -  Bangladesh University of Engineering and Technology

## Built With
- Oracle 19c (Database)
- Nodejs (Backend)
- EJS and Bootstrap (Frontend)

## Get Started
### Prerequisite Software:
1. Install [Nodejs](https://nodejs.org/en/download/)
2. Install [Oracle 19c](https://www.oracle.com/database/technologies/oracle19c-windows-downloads.html) and create and account

### Getting Our Git Repository
1. Do you have git installed?
    1. If yes, clone the repo in a directory of your choice:
    ```
    git clone https://github.com/Tanjeem29/Bookworms_L2T2TermProject.git
    ```
    2. If no, then just download the zip
    
2. Go to the directory you cloned/extracted zip, open cmd line, and install npm packages using:
```
npm install
```
3. Edit `.env` file and assign the current directory to `ROOT` variable.<br /> Example `ROOT = "D:\L2T2\CSE216\SampleTP\OracleExpressEjs"` 

### Database Setup
1. Open command line and go to sqlplus
```
sqlplus
```
2. Connect to dba
    1. username: 
    ```
    sys as sysdba
    ```
    2. password:
    ```
    password
    ```

3. Create a new user
```
create user c##booksworms identified by bookworms
grant dba to c##bookworms
```

4. Find SQL dump file in `sqldump/C##BOOKWORMS.sql`
5. Connect to bookworms database using GUI (we used Navicat, but any suitable substitutes like Datagrip etc. can be used)
6. Use the sql dump to create a database identical to ours.
#### Disclaimers:
- You may need to comment out "DROP TABLE" queries in the dump, for it to work correctly

### .env file
your .env file in the root directory should contain the following:
```
DB_USER = "c##bookworms"
DB_PASS = "bookworms"
DB_CONNECTSTRING = "localhost/orcl"
ROOT = **ENTER YOUR ROOT DIRECTORY HERE**
```
Upon correct entry of the root directory, the .env file should be good to go.

### Running the Project:

- Running the main app for READERS:
    - In terminal, run
    ```
    node app.js
    ```
    OR
    ```
    nodemon app.js
    ```
    - go to `http://localhost:3000/` on browser. 
    - Explore!
- Running the Admin app
    ```
    node admin.js
    ```
    - can add books, authors etc to database

