const Pool = require('pg').Pool
require('dotenv').config()
const connectionString = process.env.DATABASE_URL
const fs = require('fs');

const pool = new Pool({
    connectionString,
    ssl:{
      rejectUnauthorized:false
    }
  })
const Propuesta = {};

Propuesta.get = async () => {
    pool.query('SELECT * FROM propuesta', (error, results) => {
        if (error) {
          throw error
        }
        //console.log(results.rows)
        return results;
      })
};

Propuesta.find = async (id) => {
    //return await db.query(`select * from platos where id=?`, [id]);
};

Propuesta.create = async (data) => {
    try{
        const { nombre,fecha,votos,userid,descripcion } = data
        console.log(nombre)  
        
        try{
            fs.writeFileSync(userid+'.txt', descripcion);
        }catch (e){
            console.log("Cannot write file ", e);
        }
        console.log('creadoTXT')
        try{
        pool.query('insert into propuesta (titulo,fechapublicacion,votos,usuarioid) values ($1, $2, $3, $4)', [nombre,fecha,votos,userid], (error, results) => {
            if (error) {
            throw error
            }
            console.log("Propuesta Agregada: 'Ok' ")
        })
        }catch(e){}
    }catch(e){}    
};

Propuesta.update = async (id, data) => {
    try {
        /*
        const actualizar = await db.query(`update platos set ? where id=?`, [data, id]);
        if (actualizar === 'error') {
            console.error('ERROR');
        } else {
            return actualizar;
        }
        */
    } catch (e) {
        console.error(e);
    }
};

Propuesta.delete = async (id) => {
    //return await db.query(`delete from platos where id=?`, [id]);
};

module.exports = Propuesta;