import dotenv from 'dotenv';
import { Client, GatewayIntentBits } from 'discord.js';

dotenv.config();  // Load environment variables

const client = new Client({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildMessages, GatewayIntentBits.MessageContent],
});

// Define concise personal and funny responses
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
    "Grace? Always trying to start drama like it's her full-time job, but it’s just a sad attempt to stand out in a room full of people who aren't even paying attention.",
    "Grace must have some wild taste if she thought Yako was a good choice. Guess she didn’t mind the age gap—maybe she thought grooming was just part of his 'charm.'",
    "Grace? Always acting like the main character, but somehow manages to be the extra in everyone else’s story.",
  ]
};

// List of keywords that indicate negative or offensive language and their corresponding replies
const negativeWordsReplies = {
  hate: "Hate? That's a strong word! You sure you want to go there?",
  stupid: "Stupid? Ouch. Let's keep it a bit smarter, shall we?",
  dumb: "Dumb? Not the best way to express yourself, but okay...",
  idiot: "Idiot? That's harsh, buddy. Maybe try being nicer?",
  loser: "Loser? That's not a very nice thing to call someone.",
  trash: "Trash? Well, everyone has their days, don't be too harsh.",
  garbage: "Garbage? Yikes, someone's having a rough day.",
  ugly: "Ugly? I bet your mirror would disagree with you.",
  kill: "Whoa, that's way too far. Let's dial it down.",
  worthless: "Worthless? Nah, everyone has value, even if you're frustrated.",
  moron: "Moron? Now that's a strong insult. Let's be kind, shall we?",
  suck: "Suck? We all have bad moments, don't worry about it.",
  broke: "Broke? Money isn't everything, but good luck out there.",
  scam: "Scam? That's a serious accusation, maybe get the facts straight first.",
  dumbass: "Dumbass? Try to keep it cool, alright?",
  asshole: "Asshole? That's not a great look, my friend.",
  fuck: "Watch the language! Let's keep it clean.",
  bitch: "Bitch? That's pretty aggressive, don't you think?"
};

client.on('messageCreate', (message) => {
  if (message.author.bot) return;

  const content = message.content.toLowerCase();
  console.log(`Received message: ${message.content}`);

  // Check if the message contains any of the specific names or negative words
  const containsNegativeWords = Object.keys(negativeWordsReplies).some(word => content.includes(word));
  const containsNames = ['hannah', 'hana', 'abbie', 'yako', 'matteo', 'grace'].some(name => content.includes(name));

  // If the message contains a specific name, respond with a pre-defined funny response
  if (containsNames) {
    const name = ['hannah', 'hana', 'abbie', 'yako', 'matteo', 'grace'].find(name => content.includes(name));
    const response = replies[name][Math.floor(Math.random() * replies[name].length)];
    message.reply(response);
  }
  // If the message contains negative words, reply with the corresponding negative word response
  else if (containsNegativeWords) {
    const negativeWord = Object.keys(negativeWordsReplies).find(word => content.includes(word));
    message.reply(negativeWordsReplies[negativeWord]);
  }
});

client.once('ready', () => {
  // Set the bot's status to "watching /look"
  client.user.setActivity('watching /look', { type: 'WATCHING' });
  console.log('Bot is online and watching /look!');
});

client.login(process.env.DISCORD_TOKEN)
  .then(() => {
    console.log('Bot has successfully logged in!');
  })
  .catch(err => {
    console.error('Error logging in:', err);
  });
