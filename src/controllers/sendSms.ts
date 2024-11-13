import { Request, Response } from "express";

import { sendMessage } from "../utils/sendSms";

export const messageController = async (req: Request, res: Response) => {
  try {
    const { message, recipients } = req.body;
    await sendMessage(message, recipients);
    res.status(200).json({ message: "done" });
  } catch (error) {
    res.status(500).json(error);
  }
};
