# Do 
Real-time Project Tracking

## Overview
    
This app in currently in its prototyping phase and is not yet usable for purposes other than demonstrating real-time Angluar.js model syncronization via Socket.io

## Running the app

Runs like a typical express app:

    node app.js

## Directory Layout
    
    app.js              --> app config
    package.json        --> for npm
    public/             --> all of the files to be used in on the client side
      css/              --> css files
        app.css         --> default stylesheet
      img/              --> image files
      js/               --> javascript files
        app.js          --> declare top-level app module
        controllers.js  --> application controllers
        directives.js   --> custom angular directives
        filters.js      --> custom angular filters
        services.js     --> custom angular services
        lib/            --> angular and 3rd party JavaScript libraries
          angular/
            angular.js            --> the latest angular js
            angular.min.js        --> the latest minified angular js
            angular-*.js          --> angular add-on modules
            version.txt           --> version number
    routes/
      index.js          --> route for serving HTML pages and partials
    views/
      index.jade        --> main page for app
      layout.jade       --> doctype, title, head boilerplate
      partials/         --> angular view partials (partial jade templates)
        partial1.jade
        partial2.jade

## Known Issues
 - DELETE NODES ng-show issue: sharedCommentModel not getting value until after render
 - Sync issue when deleteing nodes
   - does send socket update on deleted nodes, but set method doesn't seem to persist this server side

