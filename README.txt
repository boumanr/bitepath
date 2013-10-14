/////////////////////////GIT/////////////////////////
////push to git
//you need to be in the 'code' folder to execute the following commands
git add . //for adding all changed files to the git
git commit -m 'first commit' //for adding all files to git commit
git push //transfer files to git branch

////pull from git
git pull

////delete from git
git add . //first add every file to git
git rm index.html //remove the file index2.html from git
git commit -m 'remove file index2.html from git' //remove file from git

////git remote
git remote -v //view remotes
git remote rm destination //remove remote called destination
git remote add origin https://github.com/boumanr/bitepath.git //git add remote
git push -u origin master //git push



/////////////////////////MONGO/////////////////////////
./mongod //start mongo
mongo ip:port //connect to mongo
show dbs //show databases
use bitepathdb //switch to database bitepathdb
show collections //show all collections of the db
db.venue.drop() //drop collection


/////////////////////////HEROKU/////////////////////////