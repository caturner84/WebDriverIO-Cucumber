const oracledb = require('oracledb');
const yargs = require('yargs');

const parseCmdArgs = () => yargs.argv;
const getCmdArgs = () => parseCmdArgs();
const getDbPassword = () => process.env.DB_PASSWORD || getCmdArgs().dbPassword;
const getEnvironment = () => getCmdArgs().environment;

oracledb.autoCommit = true;
oracledb.fetchAsString = [oracledb.DATE, oracledb.NUMBER];

/**
 * Returns the database configuration details based on the environment
 */
const getConnectionDetails = () => {
  const env = getEnvironment();
  switch (env) {
    case 'e0':
      return {
        user: 'xx',
        password: getDbPassword(),
        connectString: 'xxxx',
      };
    case 'e1':
      return {
        user: 'xxx',
        password: getDbPassword(),
        connectString: '(DESCRIPTION = (CONNECT_TIMEOUT= 120)(RETRY_COUNT=20)(RETRY_DELAY = 3)(TRANSPORT_CONNECT_TIMEOUT=3s)(ADDRESS_LIST = (LOAD_BALANCE=on)(ADDRESS = (PROTOCOL = TCP)(HOST=)(PORT=1525)))(CONNECT_DATA=(SERVICE_NAME = xxx)))',
      };
    case 'e2':
      return {
        user: 'xxxxx',
        password: getDbPassword(),
        connectString: '(DESCRIPTION =(CONNECT_TIMEOUT= 120)(RETRY_COUNT=20)(RETRY_DELAY=3)(TRANSPORT_CONNECT_TIMEOUT=3s)(ADDRESS_LIST =(LOAD_BALANCE=on)(ADDRESS = (PROTOCOL = TCP)(HOST=)(PORT=1526)))(ADDRESS_LIST =(LOAD_BALANCE=on)(ADDRESS = (PROTOCOL = TCP)(HOST=)(PORT=1526)))(CONNECT_DATA=(SERVICE_NAME = xxx)))',
      };
    default:
      throw new Error(`Database details not found for provided environment ${env}`);
  }
};

module.exports.getDBConnection = async () => {
  try {
    global.connection = await oracledb.getConnection(getConnectionDetails());
  } catch (err) {
    throw new Error(`Unable to connect to the database ${err}`);
  }
};

module.exports.closeConnection = async () => {
  if (connection) {
    try {
      await connection.close();
      console.log('connection is closed');
    } catch (err) {
      console.error(err);
    }
  }
};
