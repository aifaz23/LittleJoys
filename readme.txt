Name: Afsah Siddiqui
Name: Aifaz Karedia

This part is built using react for front end.
Need to create a reactapp using create-react-app from npm and change the src directory
with provided 'src' directory.

In the package.json file of frontend (react-app), 
under 	"private": true,
add the line:
	"proxy": "http://localhost:8080",

run: npm start for client side

on another terminal, cd to backend and run: node server.js

on you browser:

	http://localhost:3000/ 