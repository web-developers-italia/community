import * as functions from "firebase-functions";
import { Telegraf, Context } from "telegraf";
import { rules } from "./commands/rules";
import { rielabora } from "./commands/rielabora";
import { contribute } from "./commands/contribute";
import { atAdmin } from "./commands/atAdmin";
import { dontasktoask } from "./commands/dontasktoask";

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      TELEGRAM_BOT_KEY: string;
    }
  }
}

const insiemeBot: Telegraf<Context> = new Telegraf(
  process.env.TELEGRAM_BOT_KEY
);

insiemeBot.hears("@admin", atAdmin);

insiemeBot.hears(["/regolamento", "/regole", "/rules"], rules);

insiemeBot.hears(["/contribute", "/contribuisci"], contribute);

insiemeBot.hears(["/dontasktoask", "/nonchiederedichiedere"], dontasktoask);

insiemeBot.hears(["/rielabora"], rielabora);

export const bot = functions
  .region("europe-west1")
  .https.onRequest((req, res) => {
    insiemeBot.handleUpdate(req.body, res);
    res.sendStatus(200);
  });
