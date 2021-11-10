import { bundleDirectory } from "expo-file-system";
import * as SQLite from "expo-sqlite";

function openDatabase() {

  console.log("---------------open db-----------------------");
  const db = SQLite.openDatabase("dbdap.db");

  return db;
}
export const db = openDatabase();
export function GetDb ()
{
  if ((""+db).includes("\"_running\": false,"))db = openDatabase();
  return db;
}
export function InitSetting ()
{
    console.log("in init settings aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa");

    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists sett (id text primary key not null,  value text);"
        );
        tx.executeSql(
          "insert or ignore into sett (id, value ) values  ('pass', ''), ('cycle_length', '28'), ('period_length', '5'), ('ovulation_start', '12'), ('ovulation_length', '3');"
        );
        tx.executeSql("select * from sett", [], (_, { rows }) =>{
          console.log(JSON.stringify(rows));
        }
        );
      },
      error=>{
        console.log("ERROR - openDatabase - "+ error)},
      null
    );
    console.log("something happend");
}


