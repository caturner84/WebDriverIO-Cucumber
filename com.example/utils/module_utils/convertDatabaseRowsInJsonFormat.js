/**
 * Converts oracle database raw result set to Json format with columns names and row values
 * @param result Database raw result set from execute method
 * @returns {Array} Array for rows in Json format
 */
const convertDatabaseRowsInJsonFormat = (result) => {
  const rowsJson = [];
  for (let i = 0; i < result.rows.length; i++) {
    assert(result.rows[i].length === result.metaData.length);
    const rowJson = {};
    for (let j = 0; j < result.metaData.length; j++) {
      rowJson[result.metaData[j].name] = result.rows[i][j];
    }
    rowsJson.push(rowJson);
  }
  return rowsJson;
};

export default convertDatabaseRowsInJsonFormat;
