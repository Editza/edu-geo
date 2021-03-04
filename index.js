const Discord = require('discord.js');
const client = new Discord.Client;
const timers = require('timers')
const config = require('./data/config.json')
///////////////////////////////////////////////////
const welcome_channel = config.welcome_channel               
const emojiID = config.embed_emoji
const logc = config.logchannel
const activity1 = config.activity1
const type1 = config.type1
const activity2 = config.activity2
const type2 = config.type2
const time1 = config.activitytime
const ownerID = config.ownerID
const customtext = config.customtext
//const etitle = config.embed_title
const guildconfig = config.embed_guildname
const ecolor = config.embed_color
////////////////////////////////////////////////////

//Activites Const
let activities = [
  {
    name:`${activity1}`,
    options:{
      type:`${type1}`
    }
  },
  {
    name:`${activity2}`,
    options:{
      type:`${type2}`
    }
  }
]
let i = 0;
  client.on('ready', () => {
    console.log(`${client.user.username} has started, with ${client.users.size} users, in ${client.channels.size} channels of ${client.guilds.size} guilds.`);
    
    timers.setInterval(() => {
      i = i == activities.length ? 0 : i
      client.user.setActivity(activities[i].name, activities[i].options)
      i++
    }, time1)
  });

  client.on("message", async message =>{
  if (message.content === "!add" && message.author.id === `${ownerID}`)
  client.emit('guildMemberAdd', message.member);
  if (message.content === "!remove" && message.author.id === `${ownerID}`)
  client.emit('guildMemberRemove', message.member);
 });

  client.on('guildMemberAdd', member => {
  let count = member.guild.memberCount.toString() 
  let end = count[count.length-1]
  let suffixed = end == 1 ? count + "st" : end == 2 ? count + "nd" : end == 3 ? count + "rd" : count + "th" 
  const channel = member.guild.channels.find(chnl => chnl.name === `${welcome_channel}`);
  const memberavatar = member.user.displayAvatarURL
      if (!channel) {
        console.log("Set channel name in config.");
        return;
      };
      const guildspot = guildconfig || member.guild
      const emojispot = ` ` || `${emojiID}`
      let str = `Bine ai venit la nebuni **${member.user.username}**! \n Tu esti membrul cu numarul **${suffixed}**!
      \n${customtext} ${emojispot}`
      const embed = new Discord.RichEmbed()
      .setAuthor(member.user.tag, memberavatar)
      .setColor(ecolor)
      .setDescription(str)
      .setThumbnail(memberavatar)
      .setFooter(`📥 ${member.user.username} a venit la nebuni! :))`)
      .setTimestamp();
      channel.send(embed);
  
  const logs = member.guild.channels.find(chnl => chnl.name === `${logc}`);
  logs.send(`> :inbox_tray: ${member} a intrat la nebuni! Sa ii uram succes :))))`)
});

client.login(`ODE2NzgwNjQ2NzY0MzgwMTkw.YD_8QQ.fT4W494QlvcsBuKPTtyHLT0yRMk`)
