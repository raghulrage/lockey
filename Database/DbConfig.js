import { DB, TABLENAME } from "./Enum";
import _ from 'lodash';

export const createTables = () => {
  _.map(TABLENAME, (TABLE) => {
    const createQuery = `CREATE TABLE  ${TABLE.NAME}(${_.join(
      _.map(TABLE.COLUMNS, (col) => {
        return _.join(col, " ");
      }),
      ","
    )}${TABLE.CONSTRAINT ? ", " : ""}${_.join(TABLE.CONSTRAINT, ",")});`;

    DB.transaction((tx) => {
      tx.executeSql(createQuery, null, (tx, result) => {
        console.log(`${TABLE.NAME} table created`);
      }),
        function (tx, error) {
          console.log(error);
        };
    });
  });
}