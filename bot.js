
const config  = require("./config.json");
const package = require("./package.json");

const discord = require("discord.js");
const util    = require("util");
const mysql   = require("mysql2");

const Text        = require("./libs/Text.js");
const Mathematics = require("./libs/Mathematics.js");
const Datetime    = require("./libs/Datetime.js");


/* -----------------------------------------
   Globals
----------------------------------------- */

var commandPrefix = config.commandPrefix;

const dbHost     = "localhost";
const dbUser     = "root";
const dbPassword = "";
const dbName     = "test";


/* -----------------------------------------
   Initialize & Status
----------------------------------------- */

const client = new discord.Client({
    disableEveryone: true,
    disabledEvents: ["TYPING_START"]
});


// connected and ready
client.on("ready", () => {
	
	// set a "now playing" message (optional)
    client.user.setActivity("Now Playing SOMETHING");
	
	// set the client's online/idle/dnd/invisible status
	client.user.setStatus("online");
	
	// client has initialized, get info
	console.log("Connection was established at "+Datetime.GetToday());
    console.log(`Bot ${package.name} is online!\nLogged in as: ${client.user.tag}\n${client.users.size} users, in ${client.guilds.size} servers connected`);
	
});

// reconnecting
client.on("reconnecting", function(){
    console.log(`Bot tries to reconnect to the WebSocket...`);
});

// connection resumed
client.on("resume", function(replayed){
    console.log(`Connection resumed, ${replayed}`);
});


/* -----------------------------------------
   Handle Messages / Events / Commands
----------------------------------------- */

// execute when a message is posted
client.on("message", async message => {
	
	// ignore messages from other bots
    if (message.author.bot || message.system) {
		return;
	}
	
	// handle messages in the Direct Messages
	if (message.channel.type === "dm") {
        
		message.channel.send("Handle DMS!");
		// ...
		
		return;
		
    }
	
	// if prefix has been found, handle commands
	if (message.content.indexOf(commandPrefix) === 0) {
		
		// get message author data
		var user        = message.member.user;        // @<user>, used for mentions
		var userName    = message.member.displayName; // user name only
		var userTag     = message.member.user.tag;    // user tag, name#ID
		var userID      = message.member.id;          // user ID, e.g. 203902891350016256, may used for mentions too e.g. <@203902891350016256">
		var userIsAdmin = message.member.hasPermission("ADMINISTRATOR"); // whether the user is an admin
		
		// get data from the message contents, example message "!do hello World"
		var command        = (message.content.slice(commandPrefix.length)).split(" ")[0].toLowerCase(); // just the command, e.g. "do"
		var arguments      = (message.content.toLowerCase().slice(commandPrefix.length)).split(" "); // break all the message into parts by spaces used as arguments (& lowercase) e.g. "['do', 'hello', 'World']"
		
		var messageContent   = (message.content.slice(commandPrefix.length+command)).split(/ (.+)/).splice(1)[0] || ""; // the message content without the prefix e.g. "hello World"
		var messageParts     = messageContent != "" ? ((message.content.slice(commandPrefix.length+command)).split(/ (.+)/).splice(1)[0]).split(" ") : []; // break the message into parts by spaces without the prefix e.g. "['hello', 'World']"
		var messageArguments = messageContent != "" ? ((message.content.toLowerCase().slice(commandPrefix.length+command)).split(/ (.+)/).splice(1)[0]).split(" ") : []; // break the message used as arguments (no prefix / lowercase) e.g. "['hello', 'world']"
		
		
		// log messageContent to the console
		console.log("Handle Command: "+command);
		console.log("Invoked by user: "+userTag+" with ID: "+userID);
		console.log("Invoked at "+Datetime.GetToday());
		console.log("Arguments: "+arguments);
		console.log("MessageContent : "+messageContent);
		console.log("MessageParts : "+messageParts); 
		console.log("MessageArguments: "+messageArguments); 
		
		
		/* ----------------------------------------------
		   Command: hi, hello
		---------------------------------------------- */
		
		// user entered prefix and "hi" or "hello" as command
		if (command === "hi" || command === "hello") {
			
			// send message back
			message.channel.send(`Hi there ${message.author.toString()}!`);
			
			// if anything exists after the command
			if (arguments != "") {
				
				// also send message with anything the user typed after the command
				message.channel.send("Arguments: "+arguments+"");
				
				// send message and edit afterwards
				// message.channel.send("Arguments: "+arguments).then(sentMessage => sentMessage.edit("This was edited"));
				
				//message.reply(arguments); // send message and mention user
				
			} else {
				
				// user just typed the command and nothing more
				message.channel.send("No more input found!");
				
			}
			
		} 
		
		/* ------------- end of command -------------- */
		
		
		/* ----------------------------------------------
		   Command: say
		---------------------------------------------- */
		
		if (command === "say") {
			
			// send the input message after the command and delete the original
			message.channel.send(messageContent).then(() => {
				message.delete();
			});
			
		}
		
		/* ------------- end of command -------------- */
		

		/* ----------------------------------------------
		   Command: askrandom
		---------------------------------------------- */
		
		if (command === "askrandom") {
			
			var resultMessage = "";
			
			var replies = [
				"Most likely!",
				"Not sure about that "+userName+"...",
				"Yes!",
				"Not really "+userName+"...",
				"Oh certainly!",
				"Doubt it "+userName+"!",
				"Oh yeah!"
			];
			
			resultMessage = replies[Math.floor(Math.random() * replies.length)];
			
			// send the result
			message.channel.send(resultMessage);
			
		}
		
		/* ------------- end of command -------------- */		
		
		
		/* ----------------------------------------------
		   Command: ask
		---------------------------------------------- */
		
		if (command === "ask") {
			
			var resultMessage = "";
			
			// choose an answer if user asks about (what is your favorite/liked food)
			if (
				( messageContent.match(/what/i) || messageContent.match(/favorite/i) || messageContent.match(/liked/i) || messageContent.match(/fave/i) ) 
				&& 
				( messageContent.match(/food/i) || messageContent.match(/eat/i) || messageContent.match(/snack/i) ) 
			) {
				
				var replies = [
					"Pizza",
					"Apples",
					"Cake, "+userName+"..."
				];
				
				resultMessage = replies[Math.floor(Math.random() * replies.length)];
				
			} else {
				
				resultMessage = "Not sure what you mean, "+userName+"...";
				
			}
			
			// send the result
			message.channel.send(resultMessage);
			
		}
		
		/* ------------- end of command -------------- */	
		
		
		/* ----------------------------------------------
		   Command: react
		---------------------------------------------- */
		
		if (command === "react") {
			
			// react to existing message
			message.react("💩");
			
			// react to new message
			message.channel.send("Will get a reaction too!").then(sentMessage => sentMessage.react("💩"));

			
		}
		
		/* ------------- end of command -------------- */
		
		
		/* ----------------------------------------------
		   Command: postimage
		---------------------------------------------- */
		
		// user entered prefix and "postimage" as command
		if (command === "postimage") {
			
			var filename = "image.png";
			
			message.channel.send("Posted image!", {
				file: "content/"+filename
			});
			
		}
		
		/* ------------- end of command -------------- */
		
		
		
		/* ----------------------------------------------
		   Command: userwrite
		---------------------------------------------- */
		
		if (command === "userwrite") {
		
			var pool = mysql.createPool({
				host: dbHost,
				user: dbUser,
				password: dbPassword,
				database: dbName,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			});
			
			pool.execute(
				"SELECT * FROM userdata WHERE name=?",
				[userID],
				function(err, results) {
					
					if (err) {
						console.log("Error when executing query "+err);
					}
					
					Object.keys(results).forEach(function(key) {
						
						var row = results[key];
						
						console.log( row.name +": "+row.score );
					  
					});
					
					var newScore = row.score + 1;
					
					message.channel.send(userName+" you got :star: +1 pts!");
					
					// validate data first ...
					
					pool.execute(
						"INSERT INTO userdata (name,score) VALUES(?,?) ON DUPLICATE KEY UPDATE score=?",
						[ userID, newScore, newScore ],
						function(err) {
							
							if (err) {
								console.log("Error when executing SQL query: "+err);
							}
							
							console.log("User Data for "+userID+": "+newScore);
							
							message.channel.send("Data saved, you now have :star: "+newScore+" pts, "+userName+"!");
						}
					);
					
					
				}
			);
		
		}
		
		/* ------------- end of command -------------- */
	
		
		/* ----------------------------------------------
		   Command: userread
		---------------------------------------------- */
		
		if (command === "userread") {
			
			var pool = mysql.createPool({
				host: dbHost,
				user: dbUser,
				password: dbPassword,
				database: dbName,
				waitForConnections: true,
				connectionLimit: 10,
				queueLimit: 0
			});
			
			pool.execute(
				"SELECT * FROM userdata WHERE name=?",
				[userID],
				function(err, results) {
					
					if (err) {
						console.log("Error when executing query "+err);
					}
					
					Object.keys(results).forEach(function(key) {
						
						var row = results[key];
						
						console.log( row.name +": "+row.score );
					  
					});
					
					message.channel.send("You have :star: "+row.score+" pts, "+userName+"!");
				
				}
			);
			
		}
		
		/* ------------- end of command -------------- */
		
		
		/* ----------------------------------------------
		   Command: reverse
		---------------------------------------------- */
		
		if (command === "reverse") {
			
			// revert message
			message.channel.send( Text.Reverse(messageContent) );

			
		}
		
		/* ------------- end of command -------------- */
		
		
		/* ----------------------------------------------
		   Command: pi
		---------------------------------------------- */
		
		if (command === "pi") {
			
			// show PI constant
			message.channel.send( Mathematics.PI );
			
		}
		
		/* ------------- end of command -------------- */
		
		
		/* ----------------------------------------------
		   Command: help
		---------------------------------------------- */
		
		if (command === "help") {
			
			// send help to the user
			var help = "**Help**: \n```\n"+
			"!hi Sample message or bot reply\n"+
			"!hello alias for \"!hi\"\n"+
			"!say Bot says a message on behalf of the user\n"+
			"!askrandom Receives a Yes|No question\n"+
			"!ask Receives a more complex question \"e.g. !ask What is your favorite food?\"\n"+
			"!react Tests emoji reactions\n"+
			"!postimage Uploads and attaches an image file\n"+
			"!userwrite Tests user persistent data writing\n"+
			"!userread Tests user persistent data reading\n"+
			"!reverse Reverts a message\n"+
			"!pi Shows the PI math constant\n"+
			"!help Displays this message\n"+
			"```";
			
			// show help in current channel
			message.channel.send(help);
			
			// OR DM the user with the help text
			// message.author.send(help);

		}
		
		/* ------------- end of command -------------- */
		
	}
	
	
});


// execute when a message is deleted
client.on("messageDelete", function(message) {
	
	console.log(`Message was deleted: ${message} \nMessage was from ${message.member.user} | ${message.member.user.tag}`);
	
});

// execute when a message gets a reaction
client.on("messageReactionAdd", function(messageReaction, user) {
	
    console.log(`A reaction is added to a message`);
	
});

// execute when a message gets a reaction removed
client.on("messageReactionRemove", function(messageReaction, user) {
	
    console.log(`A reaction is removed from a message`);
	
});

// execute when a message gets an update
client.on("messageUpdate", function(oldMessage, newMessage) {
	
    console.log(`A message is updated from ${oldMessage} to ${newMessage}\nMessage was from ${oldMessage.member.user} | ${oldMessage.member.user.tag}`);
	
});

// execute when a user starts typing, won't work if disabledEvents: ["TYPING_START"] is present
client.on("typingStart", function(channel, user) {
    console.log(`${user.tag} has started typing`);
});

// execute when a user stops typing
client.on("typingStop", function(channel, user) {
	
    console.log(`${user.tag} has stopped typing`);
	
});

// execute when a user changes their name
client.on("userUpdate", function(oldUser, newUser) {
	
    console.log(`User ${oldUser} is now known as ${newUser}`);
	
});


/* -----------------------------------------
   Error Handling
----------------------------------------- */

// connection error
client.on("error", function(error){
    console.error(`Bot's WebSocket encountered a connection error: ${error}`);
});

// handle errors so they don't crash the client
process.on("uncaughtException", (err) => {
    const errorMsg = err.stack.replace(new RegExp(`${__dirname}/`, "g"), "./");
    console.error("Uncaught Exception: ", errorMsg);
});

process.on("unhandledRejection", err => {
    console.error("Uncaught Promise Error: ", err);
});


/* -----------------------------------------
   Authenticate
----------------------------------------- */

client.login(config.token);

