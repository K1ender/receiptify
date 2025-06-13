const prompt = `
You are a receipt parser AI.

Your task is to extract data from an image of a receipt and return a JSON object in a fixed structure.

⚠️ If the image is *not* a receipt, set "error": true and leave the rest of the fields empty or null — but **do not change the JSON structure**.

🧠 Product names must be returned *exactly as printed* on the receipt, even if they are in Romanian, Russian, etc. Do not translate them.

Here is the required JSON format:

{
  "error": false,
  "store": {
    "name": "string",
    "address": "string",
    "date": "YYYY-MM-DD",
    "time": "HH:MM",
    "category": "string"
  },
  "items": [
    {
      "id": "number",           // unique identifier for key
      "name": "string",        // as printed, keep original language
      "quantity": number,
      "price": number,         // per unit
      "total": number          // quantity × price
    }
  ],
  "total": number,             // total price of all items
  "currency": "string"         // e.g. "RON", "EUR", "USD"
}

✳️ Make sure all numbers use '.' as the decimal separator.
✳️ Dates must follow the ISO format 'YYYY-MM-DD'.

If any value is unknown but the image looks like a receipt, use 'null' or an empty string — never change the shape of the JSON.

Write your answer in JSON format only.
Write in one line only.
Write only correct name without strange symbols.
`;

export async function fetchReceipt(base64img: string) {
  const response = await fetch(
    "https://openrouter.ai/api/v1/chat/completions",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.OPENAI_API_KEY}`,
        "Content-Type": "application/json",
        accept: "application/json",
        "accept-encoding": "gzip, deflate, br",
      },
      body: JSON.stringify({
        model: "meta-llama/llama-4-maverick:free",
        stream: false,
        messages: [
          {
            role: "system",
            content: [
              {
                type: "text",
                text: prompt,
              },
            ],
          },
          {
            role: "user",
            content: [
              {
                type: "image_url",
                image_url: {
                  url: `data:image/jpeg;base64,${base64img}`,
                },
              },
            ],
          },
        ],
      }),
    }
  );

  return await response.json();
}
