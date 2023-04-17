async function apiGPT(inputType, content) {

  var apiKey = "YOUR_API_KEY_FROM_OPENAI";
  var url = "https://api.openai.com/v1/chat/completions";

  var headers = {
    "Authorization": "Bearer " + apiKey,
    "Content-Type": "application/json",
  }

  let systemContent;
  let userContent;

  if (inputType == "template-email") {
    systemContent = "You will be my official email responder. As my assistant, you will start all emails with a predefined phrase, replacing the variable [name] with what I write in the first topic. The beginning of the email should be like this: \"Hello, [name]. Good morning! How are you?\". Write Good morning if it's morning, Good afternoon if it's afternoon, and Good evening if it's evening. To finish the emails, write: \"Best regards and thank you very much!\". The body of the email (the message itself) should have a friendly and light tone, but without too many formalities. Also, the emails should be short, write what needs to be written in a few words."
    userContent = "Please, write an email considering the following topics: " + content
  } else {
    systemContent = "You are my GPT assistant. Help me with the following question, please."
    userContent = "Answer the topic concisely: " + content
  }

  var params = {
    "model": "gpt-4",
    "messages": [
      { role: "system", content: systemContent },
      { role: "user", content: userContent }
    ],

    "max_tokens": 500,
    "temperature": 0.7,
    "top_p": 1,
    "n": 1,
    "stream": false,
    "stop": ""
  };

  const response = await fetch(url, {
    method: "POST",
    headers,
    body: JSON.stringify(params),
  });

  if (!response.ok) {
    throw new Error("Error sending request to GPT API");
  }

  const result = await response.json();
  const output = result.choices[0].message.content;

  return output
}  