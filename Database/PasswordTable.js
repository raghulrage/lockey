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

export const PasswordTableUpdate = (payload) => {
  let fields = _.map(TABLE.COLUMNS, col => { return col[0] })
  let id = payload.id
  fields.shift()
  fields.pop()
  delete payload["id"]

  let values = _.zip(fields, Object.values(payload))
  values = _.map(values, item => { return `${item[0]} = ${typeof (item[1]) === "number" ? item[1] : `'${item[1]}'`}` })
  
  const updateQuery = `UPDATE ${TABLE.NAME}
  SET ${_.join(values, ', ')}
  WHERE id = ${id};`

  ExecuteQuery(updateQuery, TABLE)
}

export const PasswordTableSelect = async (sort, search) => {
  let selectQuery = `SELECT * FROM ${TABLE.NAME} WHERE title like "%${search}%" ORDER BY ${sort} DESC`;
  return await SelectQuery(selectQuery);
}
export const PasswordTableSelectById = async (id) => {
  let selectQuery = `SELECT * FROM ${TABLE.NAME} where id = ${id}`;
  return await SelectQuery(selectQuery);
}

export const PasswordTableDelete = (payload) => {
    let field = "id";
    const deleteQuery = `DELETE FROM ${TABLE.NAME} WHERE ${field} = ${payload};`
    ExecuteQuery(deleteQuery, TABLE)
  }