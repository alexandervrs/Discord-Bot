
A quick template to get started with a Discord Bot

1. Go to https://discordapp.com/developers/applications and click "New Application"

2. Create a new Bot for this Application, choose a name and an icon for it

3. Edit config.json and put your Client ID (which you can find under "General Information" in the Discord Developer site) in the "owner" field

4. Edit config.json and put your Token (which you can find under "Bot" in the Discord Developer site) in the "token" field

5. Invite Bot to Server using this URL (Replace CLIENTID with your Client ID which you can find under General Information)

https://discordapp.com/oauth2/authorize?&client_id=CLIENTID&scope=bot&permissions=8

6. Run your bot using "Start Bot.bat"

7. You can change your Bot's name and command prefix by editing the package.json & config.json file

8. Type !help in Discord to get a list of available sample commands

9. If Discord bot still fails to run please make sure you have nodejs installed and the discord.js & sqlite3 modules


**Hosting your Bot with Heroku**

1. Go to your Heroku dashboard and Create new App, give it a unique name

2. Go to App Settings and "Add Buildpack", then choose the "nodejs" icon

3. Make sure yo have Git and Heroku CLI tools installed (https://git-scm.com/ & https://devcenter.heroku.com/articles/heroku-cli)

4. From within your Bot folder, run cmd.exe and then:

heroku login

* this will open up the default web browser with a link, click on Login

git init
heroku git:remote -a NAME_OF_YOUR_APP
git add .
git commit -am "Setup"
git push heroku master

5. In the Heroku App dashboard now go to Resources and turn on "worker node bot.js"


**To Update and re-Deploy a Bot hosted on Heroku**

1. From within your Bot folder, run cmd.exe and then:

heroku login

* this will open up the default web browser with a link, click on Login

heroku git:remote -a NAME_OF_YOUR_APP
git commit -am "Update"
git push heroku master
