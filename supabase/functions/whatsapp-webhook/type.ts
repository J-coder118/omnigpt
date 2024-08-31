import { Database } from "../_types/database.ts";

export type ThreadRecord = Database["public"]["Tables"]["threads"]["Row"];

export type UserRecord = Database["public"]["Views"]["users_full_info"]["Row"];
export type UserRecordWithNumber = UserRecord & {
  whatsapp_number: string;
};

export type WhatsappSessionRecord =
  Database["public"]["Tables"]["whatsapp_session"]["Row"];

export type MessagesRecord = Database["public"]["Tables"]["messages"]["Row"];
