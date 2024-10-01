import twilio from 'twilio';

// Find your Account SID and Auth Token at twilio.com/console
// and set the environment variables. See http://twil.io/secure
const accountSid = 'AC288803ed3ea42b5dfb5eae927c99e877'
const authToken = "62b132e0ae997c0bf1235e524810751e";
const client = twilio(accountSid, authToken);

async function createMessage() {
  const message = await client.messages.create({
    // body: "Test message",
    // from: "+13343261147",
    // to: "+250786605505",
  });

  console.log(message.body);
}

createMessage();
