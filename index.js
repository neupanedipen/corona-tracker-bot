const config = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();
const axios = require('axios');
const fetch = require('node-fetch')
const token = config.token;


const PREFIX = '!';
client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', message => {
    if (message.channel.id === '778186187360960543') {
        let args = message.content.substring(PREFIX.length).split(" ");
        let country;
        if (args[0] === 'corona') {
            if (!args[1]) {
                message.reply("Please supply a valid countyr");
            } else {
                country = args[1];
                const url = config.api + `/${country}`;
                console.log(url)
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        if (data.message) {
                            message.reply(data.message)
                        }
                        else {
                            message.reply(`
                    Country: ${data.country}
                    Total Cases: ${data.cases}
                    Today Cases: ${data.todayCases}
                    Total Deaths: ${data.deaths}
                    Active: ${data.active}
                    Tests: ${data.tests}
                `)
                        }
                    })
                    .catch(err => console.log(err.message))
            }
        }
    }

})

// client.on('guildMemberAdd', member => {
//     const welcomeChannel = member.guild.channels.cache.find(channel => channel.name === 'welcome');
//     if (!channel) return;
//     welcomeChannel.send(`Welcome to ${member}, please the rules in the #rules channel.`)
// });

client.login(token);