import type { ReceiptResponse } from "~~/shared/types";
import { fetchReceipt } from "../ai";

export default defineEventHandler(async (event) => {
  const formData = await readMultipartFormData(event);
  if (!formData) {
    throw createError({ statusCode: 400, message: "Invalid form data" });
  }

  const file = formData.find((f) => f.name === "file");
  if (!file) {
    throw createError({ statusCode: 400, message: "File not found" });
  }

  if (file.type !== "image/jpeg" && file.type !== "image/png") {
    throw createError({ statusCode: 400, message: "Invalid file type" });
  }

  const completion = await fetchReceipt(file.data.toString("base64"));
  const raw = completion?.choices?.[0]?.message?.content;

  if (!raw) {
    console.log(completion);
    throw new Error("Empty or invalid response from OpenRouter");
  }

  const cleaned = raw
    .replace(/^```json/, "")
    .replace(/^```/, "")
    .replace(/```$/, "")
    .trim();

  console.log("Response:", cleaned);

  return JSON.parse(cleaned) as ReceiptResponse;
});
