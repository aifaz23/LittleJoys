'use strict';


// load package
const express = require('express');
const app = express();

var selectedid=0;

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));

const cors = require('cors');
app.use(cors());

var mysql = require('mysql');
const { response } = require('express');

var con = mysql.createConnection({
    host: 'localhost',
    port: '3306',
    user: 'root',
    password: 'my-secret-pw'
});

const PORT = 8080;
const HOST = '0.0.0.0';

// Connect to database
con.connect((err) => {

    if (err) { console.log(err); }
    else { console.log("Connection to mysql successful!"); }

    
    con.query("CREATE DATABASE IF NOT EXISTS CBOproject;", (err, res) => {
        if (err) { console.log(err); }
        else { console.log("A database called 'CBOproject' created/exists!"); }
    })

    con.query("USE CBOproject;", (err, res) => {
        if (err) { console.log(err); }
        else { console.log("Now using 'CBOproject' database!"); }
    })

    var managerTable = "CREATE TABLE IF NOT EXISTS manager (username VARCHAR(255),password VARCHAR(500));";
    con.query(managerTable, (err, res) => {
        if (err) { console.log(err); }
        else { console.log("Table 'manager' created/exists!\n"); }
    })

    
    var staffTable = "CREATE TABLE IF NOT EXISTS staff (id int unsigned NOT NULL auto_increment, name VARCHAR(255),phone VARCHAR(255) ,email VARCHAR(500), PRIMARY KEY (id));";
    con.query(staffTable, (err, res) => {
        if (err) { console.log(err); }
        else { console.log("Table 'staff' created/exists!\n"); }
    })

    var clientTable = "CREATE TABLE IF NOT EXISTS client (id int unsigned NOT NULL auto_increment, name VARCHAR(255), PRIMARY KEY (id));";
    con.query(clientTable, (err, res) => {
        if (err) { console.log(err); }
        else { console.log("Table 'client' created/exists!\n"); }
    })

    var reportsTable = "CREATE TABLE IF NOT EXISTS reports (associated_id int NOT NULL, title VARCHAR(255), data VARCHAR(500));"
    con.query(reportsTable, (err, res) => {
        if (err) { console.log(err); }
        else { console.log("Table 'reports' created/exists!\n"); }
    })
    

    var checkManager = 'SELECT * FROM manager WHERE username = "manager" AND password = "login"';
    con.query(checkManager, (err, res) => {
        if (err) { console.log(err); }
        else { 
            if (res.length == 0) {
                var setManager = 'INSERT INTO manager (username, password) VALUES ("manager","login");';
                con.query(setManager, (err, res) => {
                    if (err) { console.log(err); }
                    else { console.log("Manager set"); }
                });
            }
        }
    });
    
})

app.post('/login', (request,response) => {
    var username = request.body.username;
    var password = request.body.password;

    var check = "SELECT * FROM manager WHERE username = '" + username + "' AND password = '" + password + "';";
    con.query(check, (err, res) => {
        if (err) console.log(err)
        else {
            if (res.length == 0) response.send("no")
            else response.send("ok")
        }
    })
})

app.post('/staffInfo', (req, res) => {
    var getStaff = "SELECT * FROM staff ORDER BY name ASC;"
    con.query(getStaff, (err,result) => {
        if (err) {
            console.log(err); res.send("An arror occurred!")
        }
        else {
            /*
            console.log(JSON.stringify(result))
            var content = ""
            if (result.length > 0) {
                Object.keys(result).forEach(key => {
                var row = result[key];
                content=content.concat("\nName: "+row.name+"\nPhone Number: "+row.phone+"\nEmail: "+row.email+"\nId: "+row.id+"\n ********** \n\n");
                });
            }
            */
            res.send(JSON.stringify(result));
        }
    })
})

app.post('/addStaff', (req, res) => {
    var name = req.body.name
    var phone = req.body.phone
    var email = req.body.email

    var addSTAFF = "INSERT INTO staff (name,phone,email) VALUES ('"+name+"','"+phone+"','"+email+"');"
    con.query(addSTAFF, (err, result) => {
        if (err) {
            console.log(err); res.send("An arror occurred!")
        }
        else res.send("ok")
    })
})

app.post('/removeStaff', (req, res) => {
    var name = req.body.name
    var id = req.body.id

    var getStaff = "SELECT * FROM staff WHERE name = '"+name+"' AND id = '" +id+"';";
    con.query(getStaff, (err, result) => {
        if (err) console.log(err)
        else {
            if (result.length > 0) {
                var removeStaff = "DELETE FROM staff WHERE name = '"+name+"' AND id = '" +id+"';";
                con.query(removeStaff, (err, result) => {
                    if (err) console.log(err)
                    else res.send("removed")
                })
            }
            else res.send("no such staff")
        }
    })
})

app.post('/clientInfo', (req,res) => {
    var getClient = "SELECT * FROM client ORDER BY name ASC;"
    con.query(getClient, (err,result) => {
        if (err) {
            console.log(err); res.send("An arror occurred!")
        }
        else {
            /*
            var content = ""
            if (result.length > 0) {
                Object.keys(result).forEach(key => {
                var row = result[key];
                content=content.concat("\nName: "+row.name+"\nId: "+row.id+"\n ********** \n\n")
                
                })
            }
            else {
                content=content.concat("No clients yet")
            }
            */
            res.send(JSON.stringify(result));
        }
    })
})

app.post('/addClient', (req,res)=>{
    var name = req.body.name
    var addCLIENT = "INSERT INTO client (name) VALUES ('"+name+"');";

    con.query(addCLIENT, (err, result) => {
        if (err) {
            console.log(err); res.send("An arror occurred!")
        }
        else res.send("ok")
    })
})

app.post('/selectClient', (req,res) => {
    var getClient = "SELECT * FROM client WHERE id="+req.body.id+";"
    con.query(getClient, (err, result) => {
        if (err) {
            console.log(err)
            res.send("an error occurred")
        }
        else {
            if (result.length > 0) {
                selectedid = req.body.id;
                res.send("ok")
            }
            else res.send("no")
        }
    })
})

app.post('/retrieveClient', (req,res)=> {
    var getClient = "SELECT * FROM client WHERE id="+selectedid+";"
    con.query(getClient, (err, result) => {
        if (err) {
            console.log(err)
            res.send("An Error Occurred")
        }
        else {
            var client = JSON.stringify(result)
            
            var content = ""
            if (result.length > 0) {
                Object.keys(result).forEach(key => {
                var row = result[key];
                content=content.concat("\nName: "+row.name+"\nId: "+row.id+"\n\n")
            })
            }
            
            var getReports = "SELECT * FROM reports WHERE associated_id="+selectedid+";"
            con.query(getReports, (error, ress) => {
                if (error) console.log(error)
                else {
                    
                    if (ress.length > 0) {
                        content=content.concat("\n------------\nREPORTS\n------------\n\n")
                        Object.keys(ress).forEach(key => {
                        var report = ress[key];
                        content=content.concat("\n------------\nTitle: "+report.title+"\nData: "+report.data+"\n------------\n\n")
                        })
                        content=content.concat("\n ********** \n\n")

                    }
                    else {
                        content=content.concat("\n------------\nREPORTS\n------------\n\nno reports yet\n\n\n ********** \n\n")
                    }
                    
                   var reports = JSON.stringify(ress)
                }
                //res.send({client: client, reports: reports})
                res.send(content)
            })
        }
    })
})

app.post('/addReport', (req,res) => {
    var title = req.body.title
    var data = req.body.data

    var add = "INSERT INTO reports (associated_id,title,data) VALUES ('"+selectedid+"','"+title+"','"+data+"');"
    con.query(add, (err, result) => {
        if (err) {
            console.log(err)
            res.send("error")
        }
        else res.send("ok")
    })
})

app.post('/deleteReport', (req,res) => {
    var title = req.body.title

    var getreport = "SELECT * FROM reports WHERE associated_id="+selectedid+" AND title='" +title+"';";
    con.query(getreport, (err, result) => {
        if (err) {console.log(err); res.send("error")}
        else {
            if (result.length > 0) {
                var del = "DELETE FROM reports WHERE associated_id="+selectedid+" AND title='" +title+"';";
                con.query(del, (error, ress) => {
                    if (error) {console.log(error); res.send("error")}
                    else res.send("ok")
                })
            }
            else res.send("no")
        }
    })
})

app.post('/removeClient', (req,res) => {
    var name = req.body.name
    var id = req.body.id

    var getClient = "SELECT * FROM client WHERE id="+id+" AND name='"+name+"';"
    con.query(getClient, (err,result) => {
        if (err) {console.log(err); res.send("error")}
        else {
            if (result.length>0) {
                var removeClient = "DELETE FROM client WHERE id="+id+" AND name='"+name+"';"
                con.query(removeClient, (err, ress) => {
                    if (err) {console.log(err); res.send("error")}
                    var deleteAllReports = "DELETE FROM reports WHERE associated_id="+id+";"
                    con.query(deleteAllReports, (err, ress) => {
                        if (err) {console.log(err); res.send("error")}
                    })
                    res.send("removed")
                })
            }
            else {
                res.send("no")
            }
        }
    })
})


app.use('/', express.static('.'));

app.listen(PORT,HOST);
console.log("\nUp & Running!\n");