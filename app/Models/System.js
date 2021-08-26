const DB_CONNECTION = require('../../config/database.js');

class System 
{
    static getAll = () => 
    {
        return DB_CONNECTION.execute('SELECT * FROM systems')
    }

    static create = data => 
    {
        const {Sname} = data;

        return DB_CONNECTION.execute( 
            'INSERT INTO systems (Sname) VALUES (?)',
            [Sname])
    }

    static getByID = id => 
    {
        return DB_CONNECTION.execute( 
            'SELECT * FROM systems WHERE id = ?',
            [id])
    }

    static update = (id, data) => 
    {
        const {Sname} = data;

        return DB_CONNECTION.execute( 
            'UPDATE systems SET Sname = ? WHERE id = ?', 
            [Sname, id])
    }

    static delete = id => 
    {
        return DB_CONNECTION.execute( 
            'DELETE FROM systems WHERE id = ?',
            [id])
    }

}

module.exports = System;

