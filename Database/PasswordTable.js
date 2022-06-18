import { TABLENAME } from "./Enum"
import _ from 'lodash';
import { SelectQuery, ExecuteQuery } from "./Execution";

const TABLE = TABLENAME.PASSWORD

export const PasswordTableInsert = (payload) => {
  let fields = _.map(TABLE.COLUMNS, (col) => {
    return col[0];
  });

  fields.shift(); //remove id
  fields.pop(); //remove updated_at

  let values = _.map(Object.values(payload), (val) => {
    return typeof val === "number" ? val : `'${val}'`;
  });

  const insertQuery = `INSERT OR IGNORE INTO ${TABLE.NAME}(${fields}) VALUES(${values});`;

  ExecuteQuery(insertQuery, TABLE);
};