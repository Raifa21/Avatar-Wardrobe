import type { NextApiRequest, NextApiResponse } from "next";
import BoothSDKImpl from "../../../lib/core/BoothSDK";

type Data = {
  id: number;
  name: string;
  description: string;
  [key: string]: any;
};

function isErrorWithMessage(error: unknown): error is { message: string } {
  return (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as any).message === "string"
  );
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data[] | { error: string }>,
) {
  const { term } = req.query;

  if (typeof term !== "string") {
    res.status(400).json({ error: "Invalid search term" });
    return;
  }

  try {
    const boothSDK = new BoothSDKImpl({ lang: "en", adultContent: true });
    boothSDK.authenticator.sdkConnect();
    const response = await boothSDK.product.find(term as string);
    res.status(200).json(response);
  } catch (error) {
    console.error("Error in search handler:", error);

    let errorMessage = "An unknown error occurred";

    if (isErrorWithMessage(error)) {
      errorMessage = error.message;
    }

    res.status(500).json({ error: errorMessage });
  }
}
