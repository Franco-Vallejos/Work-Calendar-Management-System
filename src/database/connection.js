import sql from "mssql"

const dbSettings = {
    user: 'calendar',
    password: 'sqlcalendar',
    server: 'localhost',
    database: 'calendar',
    option: {
        encrypt: true,
        trustServerCertificate: true,

    },
}

async function getConnection() {
    const pool = await sql.connect(dbSettings);
    const result = await pool.request().query("select * from monthTurn");
    console.log(result);
}

getConnection();