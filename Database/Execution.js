import { DB } from "./Enum";

export const SelectQuery = (query) => new Promise((resolve, reject) => {
  DB.transaction((trans) => {
    trans.executeSql(query, null,(trans, results) => {
      resolve(results.rows._array);
    },
      (error) => {
        reject(error);
      });
  });
});

export const ExecuteQuery = (query, TABLE) =>{
  DB.transaction((tx) => {
    tx.executeSql(query, null, (tx, result) => {
      console.log(`query executed ${TABLE.NAME}`);
      return result.insertId;
    }),
      function (tx, error) {
        console.log(error);
      };
  });
}