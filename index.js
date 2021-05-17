const cron = require("cron");
const timezone = 'cest';
const timeNintendo = '00 00 20 * * *'; // Sec Min Hour, 8pm
const timePokemon = '00 00 16 * * *'; // 4pm
const config = require('./config.json');
const Twitter = require('twitter-lite');
const client = new Twitter(config);

console.log("Awaiting cronjob...");

let nintendoText = "A #NintendoDirect will be announced tomorrow";
let pokemonText = nintendoText.replace("Nintendo", "Pokemon");

// Send Nintendo direct prediction
new cron.CronJob(timeNintendo, async () => {
    tweet(nintendoText);
}, timeZone = timezone, start = true);

// Send Pokémon direct prediction
new cron.CronJob(timePokemon, async () => {
    tweet(pokemonText);
}, timeZone = timezone, start = true);

// Tweet function
function tweet(tweetText) {
    // Get the date
    const today = new Date();
    let tomorrow = new Date();
    tomorrow.setDate(today.getDate() + 1);
    let dateOutput = tomorrow.getDate() + '/' + (tomorrow.getMonth() + 1) + '/' + tomorrow.getFullYear();
    tweetText = `${tweetText} (${dateOutput}).`;

    // Check body length
    if (tweetText.length > 280) {
        return console.log(`Tweet body can only be 280 characters long. (Current length: ${tweetText.length})`);
    } else if (tweetText.length < 1) {
        return console.log("Tweet body has to be at least 1 character long.");
    };

    // Set body to an object
    let postBody = {
        'status': tweetText
    };

    // Tweet
    client.post('statuses/update', postBody).catch(console.error).then(result => {
        // console.log(result);
        console.log(`Tweeted: "${result.text}"`);
    });
};