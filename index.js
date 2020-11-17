const config = require('./config.json')
const Discord = require('discord.js');
const client = new Discord.Client();
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
                message.reply("Please supply a valid country in the format !corona [country]");
            } else {
                country = args[1];
                const url = config.api + `/${country}`;
                fetch(url)
                    .then(res => res.json())
                    .then(data => {
                        if (data.message) {
                            message.reply(data.message)
                        }
                        else {
                            const embed = new Discord.MessageEmbed()
                                .setTitle("Corona Tracker")
                                .addFields(
                                    { name: 'Country:', value: `${data.country}` },
                                    { name: 'Total Cases:', value: `${data.cases}` },
                                    { name: 'Active Cases:', value: `${data.active}` },
                                    { name: 'Total Deaths:', value: `${data.deaths}` },
                                    { name: 'Today Cases:', value: `${data.todayCases}` },
                                    { name: 'Tests:', value: `${data.tests}` },
                                )
                                .setThumbnail(data.countryInfo.flag)
                            message.reply(embed)
                        }
                    })
                    .catch(err => console.log(err.message))
            }
        }
    }

})

client.login(token);