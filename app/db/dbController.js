
import * as SQLite from "expo-sqlite";
import {Alert} from 'react-native';



let lastStart = "2999-01-01";
export function LastStart (value)
{
  if (value!=null)
    lastStart = value;
  return lastStart

}
let lastEnd = "1999-01-01";
export function LastEnd (value)
{
  if (value!=null)
    lastEnd = value;
  return lastEnd
}
let cycle_length =28;
export function CycleLength (value)
{
  if (value!=null && value>0)
  cycle_length = value;
  return cycle_length
}
let period_length =5;
export function PeriodLength (value)
{
  if (value!=null && value>0)
  period_length = value;
  return period_length
}
let ovulation_start = 12;
export function OvulationStart (value)
{
  
  if (value!=null && value>0)
  ovulation_start = value;
  return ovulation_start
}


function openDatabase() {

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

    db.transaction(
      (tx) => {
        tx.executeSql(
          "create table if not exists sett (id text primary key not null,  value text);"
        );
        tx.executeSql(
          "insert or ignore into sett (id, value ) values  ('pass', ''), ('cycle_length', '28'), ('period_length', '5'), ('ovulation_start', '12'), ('ovulation_length', '3');"
        );
        tx.executeSql(
          "create table if not exists day (date	TEXT primary key NOT NULL,p_start	INTEGER DEFAULT 0, p_end	INTEGER DEFAULT 0,sex	INTEGER DEFAULT 0, pill	INTEGER DEFAULT 0, note	TEXT);"
        ); 
        /*
        tx.executeSql(// -- for debug only -- 
          "insert or ignore into  day (date	,p_start, p_end	,sex, pill, note	) values (?,?,?,?,?,?);",
          ["2021-10-29",1,0,0,0, "klokan"]
        );
        tx.executeSql(// -- for debug only -- 
          "delete from day",
          []
        );
        tx.executeSql(// -- for debug only -- 
          "insert or ignore into  day (date	,p_start, p_end	,sex, pill, note	) values (?,?,?,?,?,?);",
          ["2022-01-02",1,0,0,1, "klokan"]
        );
        tx.executeSql(// -- for debug only -- 
          "insert or ignore into  day (date	,p_start, p_end	,sex, pill, note	) values (?,?,?,?,?,?);",
          ["2022-01-04",0,1,1,1, ""]
        );
        */
       /* tx.executeSql("select * from sett", [], (_, { rows }) =>{
          console.log(JSON.stringify(rows));
        }
        );*/
      },
      error=>{
        HandleDbProblem(error)},
      null
    );
    //console.log("something happend");
}

export function HandleDbProblem(ex)
{
  
    Alert.alert("Niečo sa pokazilo", ""+ex, [
        { text: 'OK' },
      ]);
}
