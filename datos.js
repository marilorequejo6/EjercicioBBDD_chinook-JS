// Aquí creamos una conexión a la base de datos
const sqlite3 = require('sqlite3').verbose(); // Importamos el módulo sqlite3
const db = new sqlite3.Database('chinook.db', sqlite3.OPEN_READWRITE, (err)=>{
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conexión a la base de datos establecida.');
    }
}); // Creamos una conexión a la base de datos
// Exportamos la conexión para que pueda ser utilizada en otros módulos
module.exports = {
    db
};