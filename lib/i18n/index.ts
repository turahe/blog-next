export {
  LOCALE_COOKIE,
  defaultLocale,
  locales,
  resolveLocale,
  type Locale,
} from "./config";
export { messagesEn } from "./messages/en";
export type { Messages } from "./messages/en";
export { messagesId } from "./messages/id";
import type { Messages } from "./messages/en";
import type { Locale } from "./config";
import { messagesEn } from "./messages/en";
import { messagesId } from "./messages/id";

export function getMessages(locale: Locale): Messages {
  return locale === "id" ? messagesId : messagesEn;
}
