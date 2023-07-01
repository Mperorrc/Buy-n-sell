const mysql = require('mysql2');

const pool=mysql.createPool({
    host:process.env.DB_host,
    user:process.env.DB_username,
    password:process.env.DB_password,
    port:process.env.DB_port,
    database:process.env.DB_DBname,
});

pool.getConnection((err)=>{
    if(err){
        console.log("error connecting to db");
    }
    console.log("connected to db");
    console.log(process.env.DB_host,
        process.env.DB_username,
        process.env.DB_password,
        process.env.DB_port,
        process.env.DB_DBname,)
})

const executeQuery=(query,arrayParams)=>{
    return new Promise((resolve,reject)=>{
        try {
            pool.query(query,arrayParams,(err,data)=>{
                if(err){
                    console.log("error in executing query");
                    reject(err);
                }
                resolve(data);
            })
        } catch (err) {
            reject(err);
        }
    })
}

module.exports={executeQuery};


