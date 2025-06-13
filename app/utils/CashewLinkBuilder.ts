import type { ReceiptResponse } from "~~/shared/types";

const phoneURL = new URL("https://cashewapp.web.app/");
const webURL = new URL("https://budget-track.web.app/");

export default (platform: "phone" | "web", response: ReceiptResponse) => {
  return LinkBuilder(platform === "phone" ? phoneURL : webURL, response);
};

function LinkBuilder(origin: URL, receipt: ReceiptResponse) {
  const url = new URL(origin.toString());
  url.pathname = "/addTransaction";

  const obj: {
    transactions: {
      amount: number;
      notes?: string;
      category?: string;
    }[];
  } = {
    transactions: [],
  };

  receipt.items.forEach((item) => {
    obj.transactions.push({
      amount: -item.total,
      notes: item.name,
      category: receipt.store.category,
    });
  });

  url.searchParams.set("JSON", JSON.stringify(obj));

  return url.toString();
}
