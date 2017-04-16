
Git checks only the folder for which it is initialized

And also you need to make Git aware of the files that it needs to keep a track of.


1. git init
    Creates a hidden directory called .git which keeps tracks of your file changes.
    If this folder is deleted everything of your version control dissapears.
    Example : rm -rf .git
    
2. git status
    Gives current status. Example : Branch and also the number of untracked files, tracked files etc

3. git add app.js
    Adds file app.js into tracked files list
    
4. git commit -m "Add app.js file"        -- Message should be in present tense ..lol

5. git status
    If you modified any file and then run git status.
    It would show something like 
        Changes not staged for commit:
        modified:   cats.js   
    We need to commit these.
    
    ************************************************************************************************
    Git commit is a 2 stage process.    You need to git add and then git commit
    ************************************************************************************************
    
    git add .   => All the files that are meant for commit are added 
    
6. git log  
    To view all the commits.  Press q to quit
    The commit id is important for versioning
    
7. git checkout a38f018bd7c78391baecbd3366c727f16f1a7134
    Move the Head to that version of the commit
    The code would be visible as it was at that commit state
    
8. git checkout master
    To return back to master
    
9. git revert --no-commit e7bca..HEAD
    Reverts back to the commit log mentioned in the code. [You need to commit it though]
    Example : git revert --no-commit a38f018bd7c78391baecbd3366c727f16f1a7134..HEAD
              git commit -m "Reverted back to something"

*******************************
            *Github*
*******************************

https://help.github.com/articles/adding-an-existing-project-to-github-using-the-command-line/

Adding an existing project into Github

git init
git add .
git commit -m "First commit"
git remote add origin https://github.com/harishasmi/ColtsWebDeveloperCourse
git remote -v
git push origin master


You did some modification

git add .
git commit -m "Some new Changes"
    If you are not logged into remote server, you use this command
        git remote add origin https://github.com/harishasmi/ColtsWebDeveloperCourse
git push origin master



****************************************
Heruko Deployment.  needs nodejs,npm,git
****************************************
Just go through the getting started file for NodeJS.  Good Documentation

Folder needs to be a gitted* for Heroku to work. (The project needs to be in a Git Repository)
    git init
    git add .
    git commit -m "Initial Commit"

heroku login
heroku create   -- Makes space in Heroku along with url
                -- Gives the url along with a remote to the git repository
    git remote -v  -- Just for Info
    
git push heroku master
                --gives an error if you visit the application url
                
heroku logs     -- Gives you the reason for failure if any. Here there is no start script

    Need to modify the package json file to incude the startup code
    "scripts": {
        "test": "echo \"Error: no test specified\" && exit 1",
        "start": "node app.js"
    }
    
    Need to run git status, git add package.json, git commit -m "Add Startup Script in Package Json file"
    
git push heroku master

Done. You can now check the URL


Now if you done some change and want to push it to Heroku
    
    git status
    git add .
    git commit -m "Modified the code"
    git push heroku master


Run terminal commands in heroku container using your terminal. You can even install mongo in this way

heroku run ls
heroku run ls node_modules
herok run npm install mongoose --save


Database : 
    You can have mongo installed in Heroku but MongoLab is simpler
    
Goto MongoLab. Create an Account. Verify it
Create a new MongoDB Deplpyment. 
Create a free Single node subscription (Wish I had money!!)

Create a user (Developer User Account) to the database in order for the connection string to work
Replce the dbuser and dbpassword into the url provided by mongolab in your application

Then deploy to heroku. Git add,commit and push


Environment variables :

export DATABASEURL=mongodb://localhost/yelp-camp  in terminal of your local machine

In heroku, click on settings for the app and set the environment variable as a key value pair