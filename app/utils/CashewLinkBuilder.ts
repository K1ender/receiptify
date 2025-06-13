import type { ReceiptResponse } from "~~/shared/types";

const phoneURL = new URL("https://cashewapp.web.app/");
const webURL = new URL("https://budget-track.web.app/");

export default (platform: "phone" | "web", response: ReceiptResponse) => {
  return LinkBuilder(platform === "phone" ? phoneURL : webURL, response);
};

function LinkBuilder(origin: URL, receipt: ReceiptResponse) {
  const url = new URL(origin.toString());
  url.pathname = "/addTransactionRoute";

  url.searchParams.set("amount", receipt.total.toString());
  url.searchParams.set("title", receipt.store.name);
  url.searchParams.set(
    "notes",
    receipt.items.map((i) => `${i.name} x ${i.quantity}`).join("\n")
  );
  if (receipt.store.category) {
    url.searchParams.set("category", receipt.store.category);
  }

  return url.toString();
}
