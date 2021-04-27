const Discord = require('discord.js');
//const { slice } = require('ffmpeg-static');
//const ytdl = require('ytdl-core');
const { prefix, token, perms } = require('./config.json');
const client = new Discord.Client();

client.once('ready', () => {
	console.log('Ready!');
});

function addUser(message,args){
    args.shift();
    //console.log(args);
    var role_string = args.join(' ');

    const ROLE = message.guild.roles.cache.find(role => role.name == role_string);
    if (!ROLE) {
        message.channel.send("That role does not exist. Use =new to create it.");
        return;
    }
    const user = message.mentions.users.first();
    //console.log("user = " + user);
    if (!user) {
        message.channel.send("Please include a User to add!");
        return;
    }
    const member = message.guild.members.cache.get(user.id);
    //console.log(member);
    member.roles.add(ROLE);
    message.channel.send(`Added ${user} to role ${role_string}.`);
}
function createRole(message,args){
    var name = '';
    while (args.length != 0 && args[0][0] != "#"){
        name += args.shift();
        name += ' ';
    }
    console.log("after name processing: "+ args);
    if (args.length == 0){
        color = "#7b8583";
        var color_print = "default_color";
    }
    else{
        color = args[0];
        var color_print = color;
    }   
    console.log('role name is ' + name);
    var role = message.guild.roles.cache.find(x => x.name === name);
    if (!role) {
        message.guild.roles.create({data: {name: name, permissions: perms, color: color }});
        message.channel.send(`Role "${name}" created with color ${color_print}. Use =add @user role to add new users.`)
    }
    else{
        console.log("role already exists\n");
        return;
    }
}


client.on('message',message => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    if (command === 'new'){
        createRole(message,args);
    }
    else if (command === 'infonew'){
        message.channel.send("Create a new role.\nUSAGE: =new role-name color(hex code)");
    }
    else if (command === 'add'){
        //console.log(args + ' ' + message.mentions.users.first());        
        addUser(message,args);
    }
    else if (command === 'infoadd'){
        message.channel.send("Add a user to a role.\nUSAGE: =add @user role")
    }
    else if (command === 'info' || command === 'help'){
        message.channel.send("My prefix is '='\nCommands: new, add.\nType =info<command> for more details.")
    }
    


});
client.login(token);