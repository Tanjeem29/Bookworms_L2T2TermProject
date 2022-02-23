
require('dotenv').config();
const DB = require(process.env.ROOT + '\\DB\\DB_Basics');
const path = require('path');
const fs = require('fs');
const prompt = require("prompt-sync")({ sigint: true });
const DB_Admin = require(process.env.ROOT + '\\DB\\DB_Admin');


function validDate(string){

}

async function run(){
    await DB.startup();
    while(true){
        
        console.log(`Enter Table you want to edit:
        1. Author
        2. Reader
        3. Books
        4. Genres
        5. Publishers
        6. Quotes
        7. Written_By
        8. Book_Genre
        9. Author_Genre
        0. EXIT
                    `);
                    
        table = prompt();
        
        if(table == 1){
            while(true){

                console.log('Currently In AUTHOR');
                console.log(`Function:
            1. Show all
            2. Add
            3. Add Photo
            4. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getAuthors();
                    console.log(results);
                }
                else if(func == 2){

                    console.log('Please add books of this author to WRITTEN_BY')


                    fname = prompt("Enter First Name: (Max: 25 letters)  ")
                    lname = prompt("Enter Last Name: (Max: 25 letters)  ")
                    email = prompt("Enter email: (Max: 30 letters)  ")
                    bio = prompt("Enter Bio: (Max: 3500 letters)  ")
                    born = prompt("Enter Birth Date: (Format: DD/MM/YYYY)  ")
                    //photo = prompt("Enter photo absolute path")

                    results = await DB_Admin.insertAuthor(fname, lname, email,bio, born);
                }
                else if(func == 3){


                    id = prompt("Enter AUTHOR_ID of the Author whose photo you want to add: ")
                    abspath = prompt("Enter absolute path of the photo: ")
                    let savePath = path.join("./public/author/"+id);

                    if(path.extname(abspath).toLowerCase() === ".png") {
                        extension = ".png";
                        fs.rename(abspath, savePath+extension, (err) => {
                            console.log("******Some Error Occured Uploading*******");
                            if(err) {
                                return err;
                            }
                        });
                        console.log("Photo Saved as .png!");
                    }
                    else if(path.extname(abspath).toLowerCase() === ".jpg") {
                        extension = ".jpg";
                        fs.rename(abspath, savePath+extension, (err) => {
                            if(err) {
                                console.log("******Some Error Occured Uploading*******");
                                return err;
                            }
                        });
                        console.log("Photo Saved as .jpg!");
                    }


                    results = await DB_Admin.addAuthorPhoto(id+extension, id);


                }
                else if(func == 4){
                    id = prompt("Enter AUTHOR_ID of the Author you want to delete: ")
                    results = await DB_Admin.deleteAuthor(id);
                }
                else if(func == 0){
                    console.log("Backing out from AUTHOR");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }

        }
        else if(table == 2){
            while(true){
            console.log('Currently In READER');
            console.log(`Function:
        1. Show all
        2. Delete
        0. Back
                `);
            func = prompt();
            if(func == 1){
                results = await DB_Admin.getReaders();
                console.log(results);
            }
            else if(func == 2){
                id = prompt("Enter READER_ID of the Reader you want to delete: ")
                results = await DB_Admin.deleteReader(id);
            }
            else if(func == 0){
                console.log("Backing out from READER  ");
                break;
            }
            else{
                console.log("Invalid input");
            }
        }

        }
        else if(table == 3){
            
            while(true){

                console.log('Currently In BOOKS');
                console.log(`Function:
            1. Show all
            2. Add
            3. Add cover
            4. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getBooks();
                    console.log(results);
                }
                else if(func == 2){
                    flag = prompt('You MUST have a publisher_id for your book. Do you want to continue adding? (Y/N)')
                    if(flag == 'Y'){
                        title = prompt("Enter Title: (Max: 50 letters)  ")
                        preview = prompt("Enter Preview: (Max: 2000 letters)  ")
                        ISMDB = prompt("Enter ISMDB Rating: (0 to 5)  ")
                        publisher = prompt("Enter publisher_id: (cannot be null/invalid)  ")
                        edition = prompt("Enter Edition: (Max: 20 letters)  ")

                    results = await DB_Admin.insertBook(title, preview, ISMDB, publisher, edition);
                    }
                    else{

                    }
                    
                }
                else if(func == 3){


                    id = prompt("Enter BOOK_ID of the Book whose photo you want to add: ")
                    abspath = prompt("Enter absolute path of the photo: ")
                    let savePath = path.join("./public/book/"+id);

                    if(path.extname(abspath).toLowerCase() === ".png") {
                        extension = ".png";
                        fs.rename(abspath, savePath+extension, (err) => {
                            console.log("******Some Error Occured Uploading*******");
                            if(err) {
                                return err;
                            }
                        });
                        console.log("Photo Saved as .png!");
                    }
                    else if(path.extname(abspath).toLowerCase() === ".jpg") {
                        extension = ".jpg";
                        fs.rename(abspath, savePath+extension, (err) => {
                            if(err) {
                                console.log("******Some Error Occured Uploading*******");
                                return err;
                            }
                        });
                        console.log("Photo Saved as .jpg!");
                    }


                    results = await DB_Admin.addBookPhoto(id+extension, id);


                }
                else if(func == 4){
                    id = prompt("Enter BOOK_ID of the Book you want to delete: ")
                    results = await DB_Admin.deleteBook(id);
                }
                else if(func == 0){
                    console.log("Backing out from AUTHOR");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }
        }
        else if(table == 4){
            
            while(true){

                console.log('Currently In GENRES');
                console.log(`Function:
            1. Show all
            2. Add
            3. Add Photo
            4. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getGenres();
                    console.log(results);
                }
                else if(func == 2){
                    console.log('A genre with no books will not be displayed')
                    
                    name = prompt("Enter Name: (Max: 30 letters)  ")
                    summary = prompt("Enter Summary: (Max: 2000 letters)  ")

                    results = await DB_Admin.insertGenre(name, summary);
                   
                    
                }
                else if(func == 3){


                    id = prompt("Enter GENRE_ID of the GENRE whose photo you want to add: ")
                    abspath = prompt("Enter absolute path of the photo: ")
                    let savePath = path.join("./public/genre/"+id);

                    if(path.extname(abspath).toLowerCase() === ".png") {
                        extension = ".png";
                        fs.rename(abspath, savePath+extension, (err) => {
                            //console.log("******Some Error Occured Uploading*******");
                            if(err) {
                                return err;
                            }
                        });
                        console.log("Photo Saved as .png!");
                    }
                    else if(path.extname(abspath).toLowerCase() === ".jpg") {
                        extension = ".jpg";
                        fs.rename(abspath, savePath+extension, (err) => {
                            if(err) {
                                //console.log("******Some Error Occured Uploading*******");
                                return err;
                            }
                        });
                        console.log("Photo Saved as .jpg!");
                    }


                    results = await DB_Admin.addGenrePhoto(id+extension, id);


                }
                else if(func == 4){
                    id = prompt("Enter GENRE_ID of the Genre you want to delete: ")
                    results = await DB_Admin.deleteGenre(id);
                }
                else if(func == 0){
                    console.log("Backing out from GENRE");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }
        }
        else if(table == 5){
            
            while(true){

                console.log('Currently In PUBLISHERS');
                console.log(`Function:
            1. Show all
            2. Add
            3. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getPublishers();
                    console.log(results);
                }
                else if(func == 2){
                    //console.log('A genre with no books will not be displayed')
                    
                    name = prompt("Enter Name: (Max: 40 letters)  ")
                    address = prompt("Enter Address: (Max: 50 letters)  ")
                    contact = prompt("Enter Contact: (Max: 20 letters)  ")
                    email = prompt("Enter Contact: (Max: 40 letters, cannot be null)  ")

                    results = await DB_Admin.insertPublisher(name, address, contact, email);
                   
                    
                }
                else if(func == 3){
                    id = prompt("Enter PUBLISHER_ID of the Publisher you want to delete:  ")
                    results = await DB_Admin.deletePublisher(id);
                }
                else if(func == 0){
                    console.log("Backing out from PUBLISHER");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }
        }
        else if(table == 6){
            //console.log('Currently In QUOTES');
            while(true){

                console.log('Currently In QUOTES');
                console.log(`Function:
            1. Show all
            2. Add
            3. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getQuotes();
                    console.log(results);
                }
                else if(func == 2){

                    flag = prompt('You can add BOOK_ID. If so, make sure you have one in mind. Do you want to continue adding? (Y/N)  ')
                    if(flag == 'Y'){
                        body = prompt("Enter main Quote: (Max: 200 letters)  ")
                        book = prompt("Enter Valid BOOK_ID: (can be null)  ")
                        character = prompt("Enter Source Character: (Max: 50 letters)  ")
                    results = await DB_Admin.insertQuote(body, book, character);
                    }
                    else{

                    }
                   
                    
                }
                else if(func == 3){
                    id = prompt("Enter QUOTE_ID of the QUOTE you want to delete: ")
                    results = await DB_Admin.deleteQuote(id);
                }
                else if(func == 0){
                    console.log("Backing out from QUOTES");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }
        }
        
        else if(table == 7){
            //console.log('Currently In QUOTES');
            while(true){

                console.log('Currently In WRITTEN_BY');
                console.log(`Function:
            1. Show all
            2. Add
            3. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getWrittenBy();
                    console.log(results);
                }
                else if(func == 2){

                    flag = prompt('You MUST have a BOOK_ID and AUTHOR_ID in mind. Do you want to continue adding? (Y/N) ')
                    if(flag == 'Y'){
                        author = prompt("Enter valid AUTHOR_ID: ")
                        book = prompt("Enter Valid BOOK_ID: ")
                    
                    results = await DB_Admin.insertWrittenBy(author, book);
                    }
                    else{

                    }
                   
                    
                }
                else if(func == 3){
                    aid = prompt("Enter AUTHOR_ID: ")
                    bid = prompt("Enter BOOK_ID: ")
                    results = await DB_Admin.deleteWrittenBy(aid, bid);
                }
                else if(func == 0){
                    console.log("Backing out from WRITTEN_BY");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }
        }

        else if(table == 8){
            //console.log('Currently In QUOTES');
            while(true){

                console.log('Currently In BOOK_GENRE');
                console.log(`Function:
            1. Show all
            2. Add
            3. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getBookGenre();
                    console.log(results);
                }
                else if(func == 2){

                    flag = prompt('You MUST have a BOOK_ID and GENRE_ID in mind. Do you want to continue adding? (Y/N) ')
                    if(flag == 'Y'){
                        genre = prompt("Enter valid GENRE_ID: ")
                        book = prompt("Enter Valid BOOK_ID: ")
                    
                    results = await DB_Admin.insertBookGenre(genre, book);
                    }
                    else{

                    }
                   
                    
                }
                else if(func == 3){
                    flag = prompt('You MUST have a BOOK_ID and GENRE_ID in mind. Do you want to continue deleting? (Y/N) ')
                    if(flag == 'Y'){
                        gid = prompt("Enter GENRE_ID: ")
                        bid = prompt("Enter BOOK_ID: ")
                        results = await DB_Admin.deleteBookGenre(gid, bid);
                    }
                
                }
                else if(func == 0){
                    console.log("Backing out from BOOK_GENRE");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }
        }
        else if(table == 9){
            //console.log('Currently In QUOTES');
            while(true){

                console.log('Currently In AUTHOR_GENRE');
                console.log(`Function:
            1. Show all
            2. Add
            3. Delete
            0. Back
                    `);
                func = prompt();
                if(func == 1){
                    results = await DB_Admin.getAuthorGenre();
                    console.log(results);
                }
                else if(func == 2){

                    flag = prompt('You MUST have a AUTHOR_ID and GENRE_ID in mind. Do you want to continue adding? (Y/N) ')
                    if(flag == 'Y'){
                        genre = prompt("Enter valid GENRE_ID: ")
                        author = prompt("Enter Valid AUTHOR_ID: ")
                    
                    results = await DB_Admin.insertAuthorGenre(genre, author);
                    }
                    else{

                    }
                   
                    
                }
                else if(func == 3){
                    flag = prompt('You MUST have a AUTHOR_ID and GENRE_ID in mind. Do you want to continue deleting? (Y/N) ')
                    if(flag == 'Y'){
                        gid = prompt("Enter GENRE_ID: ")
                        aid = prompt("Enter AUTHOR_ID: ")
                        results = await DB_Admin.deleteAuthorGenre(gid, aid);
                    }
                
                }
                else if(func == 0){
                    console.log("Backing out from AUTHOR_GENRE");
                    break;
                }
                else{
                    console.log("Invalid input");
                }
            }
        }
        else if(table == 0){
            await DB.shutdown();
            console.log('Exiting........');
            break;
        }
        else{
            console.log("Invalid input");
        }
        



        
    }
}


run();


// const prompt = require('prompt-sync')({sigint: true});

// const num = prompt('Enter a number: ');
// console.log('Your number + 4 =');
// console.log(Number(num) + 4);