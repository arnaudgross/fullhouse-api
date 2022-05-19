const database = require('../../api/database');
 
module.exports = class TypeRepository
{
    selectAll()
    {
        return database
            .promise()
            .execute("SELECT * FROM types")
            .then(result => result[0]);
    }

    countAll(offset = 0, limit = 100)
    {
        return database
            .promise()
            .execute("SELECT COUNT(*) AS count FROM types")
            .then(result => result[0][0].count);
    }

    selectById(type_id)
    {
        return database
            .promise()
            .execute(
                "SELECT type_id, type_name, type_slug FROM types WHERE types.type_id = ?", 
                [type_id]
            )
            .then(result => result[0]);
    }

    insert(entity)
    {
        return database
            .promise()
            .execute(
                "INSERT INTO types (type_name, type_slug) VALUES (?, ?)", 
                [entity.type_name, entity.type_slug]
            )
            .then(result => result[0])
    }

    put(type_id, entity)
    {
        return database
            .promise()
            .query(
                "UPDATE types SET ? WHERE type_id = ?", 
                [entity, type_id]
            )
            .then(result => result[0]);
    }

    delete(type_id)
    {
        return database
            .promise()
            .execute(
                "DELETE FROM types WHERE type_id = ?", 
                [type_id]
            )
            .then(result => result[0]);
    }
}
