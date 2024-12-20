import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';
import express from 'express';

dotenv.config();  // Load environment variables

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent
  ],
});

// Set up Express server to respond to UptimeRobot
const app = express();

// Define an endpoint to respond to UptimeRobot pings
app.get('/', (req, res) => {
  res.send('Bot is online');
});

// Start the Express server
const PORT = process.env.PORT || 8080; // Use Render's dynamic port or fallback to 8080
app.listen(PORT, () => {
  console.log(`Express server is running on port ${PORT}`);
});

const replies = {
  hannah: [
    "Hannah? I swear she walks at the speed of dial-up internet.",
    "Hannah? I think her WiFi is slower than her brain sometimes.",
    "Hannah? I wonder if she thinks 'loading' is a personality trait.",
  ],
  hana: [
    "Hana? Thinks buffering is a dance move, probably slower than dial-up WiFi.",
    "Hana? When she says 'wait a second', it could mean anything from 5 minutes to never.",
    "Hana's idea of fast is like 3 minutes behind everyone else.",
  ],
  abbie: [
    "Abbie? Calling others 'pigs' but she’s more like the farm’s biggest cow.",
    "Abbie likes calling people pigs, but she might just be the head pig herself.",
    "Abbie? Always calling others pigs but she’s the one rolling in the mud.",
  ],
  yako: [
    "Yako? Can barely speak English, probably should’ve stuck to the basics before texting minors.",
    "Yako’s conversations with minors? I think he needs a dictionary, or better yet, a time machine to go back and rethink his choices.",
    "Yako? His English is so bad, it’s like he was texting from a different time zone... and a very sketchy one.",
  ],
  matteo: [
    "Matteo? The king of crypto, the richest guy in the room. No one can match his game.",
    "Matteo? The only guy I know who makes wealth look easy. A crypto boss and an absolute legend.",
    "Matteo? Crypto king, business mogul, the person everyone looks up to. If there’s a throne, Matteo’s sitting on it.",
  ],
  grace: [
    "Grace? Always trying to stand out like a pick-me. Must be exhausting.",
    "Grace? If she's not picking fights, she's trying to convince everyone how unique she is.",
    "Grace? She’s got that energy like she’s auditioning for a role in a drama series.",
  ],
  nicole: [
    "Nicole? The furry with an OnlyFans... She thinks everyone’s interested in her cosplay, but it’s really just her only fans.",
    "Nicole? An OnlyFans model who probably spends more time explaining furry lore than actually living her life.",
    "Nicole? You’d think with all the fur she wears, she could find a way to hide her cringe-worthy choices.",
  ],
  pig: [
    "Pig? I guess someone has a farm they're running. Hope you're not the one rolling in the mud.",
    "Pig? Calling someone a pig when you’re the one wallowing in the mud... classy.",
    "Pig? Oink oink, time to clean up your act.",
  ],
};

const negativeWordsReplies = {
  hate: "Hate? You must be talking about yourself. The mirror never lies.",
  stupid: "Stupid? Oh, the irony in this message is unmatched.",
  dumb: "Dumb? Bold words coming from someone who types like that.",
  idiot: "Idiot? Takes one to know one, doesn’t it?",
  loser: "Loser? Says the person spending time arguing with a bot.",
  trash: "Trash? I’d suggest looking in your room for the source.",
  garbage: "Garbage? That’s rich coming from you. Recycling day is tomorrow.",
  ugly: "Ugly? You’ve got a lot of confidence for someone hiding behind a screen.",
  kill: "Kill? The only thing you’re killing is the vibe here.",
  worthless: "Worthless? Coming from you, that’s practically a compliment.",
  moron: "Moron? Well, you’ve got the credentials to recognize one, I see.",
  suck: "Suck? Like the energy you’re putting into this weak insult?",
  broke: "Broke? Don’t project your financial situation onto me.",
  scam: "Scam? Did your personality come with a receipt?",
  dumbass: "Dumbass? Takes one to call one, I suppose.",
  asshole: "Asshole? Oh, you’re just mad I do my job better than you.",
  fuck: "Wow, the vocabulary of a poet. Truly inspiring.",
  bitch: "Bitch? At least I don’t bark like you."
};


// Define the event listener for new messages
client.once('ready', () => {
  console.log('Bot is online and watching /look!');
  client.user.setActivity('watching /look', { type: 'WATCHING' });

  // Now that the client is ready, we can listen for messages
  client.on('messageCreate', (message) => {
    if (message.author.bot) return;

    const content = message.content.toLowerCase();
    console.log(`Received message: ${message.content}`);

    // Check for specific names or negative words in the message
    const containsNames = ['hannah', 'hana', 'abbie', 'yako', 'matteo', 'grace', 'nicole'].some(name => content.includes(name));
    const containsNegativeWords = Object.keys(negativeWordsReplies).some(word => content.includes(word));

    // Respond with pre-defined replies based on names or negative words
    if (containsNames) {
      const name = ['hannah', 'hana', 'abbie', 'yako', 'matteo', 'grace', 'nicole'].find(name => content.includes(name));
      const response = replies[name][Math.floor(Math.random() * replies[name].length)];
      message.reply(response);
    } else if (containsNegativeWords) {
      const negativeWord = Object.keys(negativeWordsReplies).find(word => content.includes(word));
      message.reply(negativeWordsReplies[negativeWord]);
    } else if (content.includes("pig")) {
      const pigResponse = replies.pig[Math.floor(Math.random() * replies.pig.length)];
      message.reply(pigResponse);
    }
  });
});

// Log in to Discord with your token
client.login(process.env.DISCORD_TOKEN).then(() => {
  console.log('Bot has successfully logged in!');
}).catch(err => {
  console.error('Error logging in:', err);
});
