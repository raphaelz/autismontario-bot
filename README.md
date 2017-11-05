# Autism Ontario Facebook Assistant


## Challenge

*Challenge 2: Create a solution that enables Autism Ontario to direct specific information to specific users.*

## Background  

Autism Ontario (formerly Autism Society Ontario) is the leading source of information and referral on autism and one of the largest collective voices representing the autism community. Members are connected through a volunteer network of Chapters throughout the Province of Ontario.

Autism Ontario is dedicated to increasing public awareness about autism and the day-to-day issues faced by individuals with autism, their families, and the professionals with whom they interact.

This challenge was formed as part of their effort to improve the access to information and outreach.


## Solution

We created a Facebook Messenger bot that interacts with visitors on the Autism Ontario Facebook page. The bot provides information on a variety of topics related to autism in a way that follows like a conversation for parents.

The parent can look up resources on topics such as symptoms or diagnosis and be given relevant information in the bot.

## Prerequisites
* Facebook account with Messenger application
* [Dialogflow](https://console.dialogflow.com) account


## Installation

* Install [Node.js](https://nodejs.org/)
* Install required packages with `npm`:
```shell
npm install
```

* Start endpoint server
```shell
npm start
```

## Setup Instructions

### Steps
1. Use the [Dialogflow Console](https://console.dialogflow.com/api-client/#/newAgent) to add a new agent with a name of your choosing.
1. Click *Save* to save the project.
1. Click on the gear icon to see the project settings.
1. Select *Export and Import*.
1. Select *Restore from zip*. Follow the directions to restore from the `AutismOntarioBot.zip` file in this repo.

1. Go to the Dialogflow console and select *Fulfillment* from the left navigation menu. Enable *Webhook*, set the value of *URL* to the backend server, then click *Save*.
1. Select *Integrations* from the left navigation menu and open the *Settings* menu for Facebook Messenger.
1. Create your own *Verify Token* that will later be used when setting up the Facebook Messenger webhooks.
1. Enter the *Page Access Token* from the Facebook Messenger application.
1. Click *Start*.
1. Go to *Settings* for the Facebook Messenger application.
1. Click *Setup Webhooks*.
1. Enter the *Callback URL* from Dialogflow and the *Verify Token*.
1. Check all the *Subscription Fields*.
1. Click *Verify and Save*.

## Contributors
- [Raphael Z.](https://github.com/raphaelz)
- [Aleks S.](https://www.linkedin.com/in/aleksander-sobieraj/)
- [Abhilash K.](https://github.com/apravink)
- [Ashley B.](https://www.linkedin.com/in/ashley-boca-61b4a1126/)
- [Ashley W.](https://twitter.com/codecatto)
- [Kaylin L.](https://www.linkedin.com/in/kaylinlee/)
