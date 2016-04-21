# Group-12
# MIMIC-III Cohort Exploration
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
2. Run MongoDB using ```mongo``` (Advisable to Robomongo as an interface to check db records) <br/>
3. Use MIMIC database by running ```use MIMIC``` <br/>
4. Insert the data(JSON) into mongoDB using: ```mongoimport --db MIMIC --collection records --type json --file MIMIC_InfoVis_2.json
--jsonArray```<br/>
5. Install Nodejs and NPM using Homebrew<br/>
6. Navigate to the home directory using command prompt and run ```npm install```, this will install the dependencies<br/>
7. Navigate to the home directory using command prompt and run ```npm start```<br/>
8. In the browser, first go to ```localhost:8080/api/data``` to check the data currently in use <br/>
9. Then go to ```localhost:8080/index.html``` (Might take a few seconds to load)<br/>
