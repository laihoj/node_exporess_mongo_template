# node_express_mongo_template
Copy this template as a starting point when making simple web apps. Probably saves you an hour per app


This is a node.js + express + mongoDB web app template with user authentication managed by the framework.

.
+-- package.json
+-- package-lock.json
+-- db.js
+-- index.js
+-- utils.js
+-- db
|   +-- default_user.js
|   +-- app.js
+-- models
|   +-- default_user.js
+-- public
|   +-- css
|   |   +-- normalize.css
|   |   +-- skeleton.css
|   |   +-- smooth_box_shadow.css
|   |   +-- default.css
|   |   +-- style.css
|   +-- js
|   |   +-- default.js
|   |   +-- index.js
+-- routes
|   +-- auth.js
|   +-- app.js
+-- views
|   +-- pages
|   |   +-- default_index.ejs
|   |   +-- default_login.ejs
|   |   +-- default_register.ejs
|   |   +-- default_user.ejs
|   +-- partials
|   |   +-- default_flashes.ejs
|   |   +-- default_footer.ejs
|   |   +-- default_header.ejs
|   |   +-- default_navbar.ejs


To effectively use this, you should have the following command line tools installed:
- npm
- git
- heroku

Step A: Set up a mongoDB, for example at https://mlab.com/
- create a user for your new sandbox of a database

Step B: Copy this repo
locally, you will need to create an environment by doing the following
- create a .env file 
- append to .env DATABASEURL=enter_your_mongodb_url_here
- append to .env SECRET=enter_a_secret
then run
- npm install

Step C: Set up hosting, at https://dashboard.heroku.com/
- connect heroku to your repository
- enable automatic deployments
- set config vars in settings: 
  - DATABASEURL=enter_your_mongodb_url_here
  - SECRET=enter_a_secret
  
Get developing!

You can:
- define new models at /models/
- define new db functionality for those models at /db/app.js
- define new routes to make use of that functionality at /routes/app.js
- define new views for those functionalities at /views/pages and /views/partials
