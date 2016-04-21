# node-dc-mongo
<h2>Data visualization using d3.js, dc.js, crossfilter.js, node.js and mongodb<h2><br/>

Required Components:<br/>
D3.js<br/>
Dc.js<br/>
Node.js<br/>
Crossfilter.js<br/>
Jquery<br/>
MongoDB<br/>

Steps for successful execution:<br/>
1. Install MongoDB using Homebrew: ```brew install mongodb```<br/>
2. Insert the data(JSON) into mongoDB using: ```mongoimport --db MIMIC --collection records --type json --file start_point.json
--jsonArray```<br/>
3. Install Nodejs and NPM<br/>
4. Navigate to the home directory using command prompt and run ```npm install```, this will install the dependencies<br/>
5. Navigate to the home directory using command prompt and run ```npm start```<br/>
6. In your browser go to ```localhost:8080/index.html```<br/>
