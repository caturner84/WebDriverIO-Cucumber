let oracledb = require('oracledb');
let utils = require('../utils/helper');
oracledb.autocommit=true;

module.exports.getDBConnection = async  function () {
    try{
        console.log('connection does not exist: setting new connection');
        global.connection = await oracledb.getConnection(utils.getDBConfig());

    }catch(err){
        console.log(err);
    }
};

module.exports.closeConnection = async function (connection){
    if(connection){
        try{
            await connection.close();
            console.log('connection is closed');
        }catch (err){
            console.error(err);
        }
    }
};