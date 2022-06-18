import * as SQLite from "expo-sqlite";

const databaseName = "lockey";

export const DB = SQLite.openDatabase(databaseName);

export const TABLENAME = {
  PASSWORD: {
    NAME: "password",
    COLUMNS: [
      ["id", "integer", "PRIMARY KEY AUTOINCREMENT"],
      ["title", "text"],
      ["data", "text"],
      ["used", "int"],
      ["created_at", "datetime"],
      ["updated_at", "default", "current_timestamp"],
    ],
  },
};