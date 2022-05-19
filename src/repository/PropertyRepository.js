const database = require('../../api/database');
 
module.exports = class PropertyRepository
{
    selectAll(offset = 0, limit = 100)
    {
        return database
            .promise()
            .execute(
                "SELECT * FROM properties LIMIT ?, ?", 
                [offset, limit]
            )
            .then(result => result[0]);
    }

    countAll(offset = 0, limit = 100)
    {
        return database
            .promise()
            .execute("SELECT COUNT(*) AS count FROM properties")
            .then(result => result[0][0].count);
    }

    selectById(property_id)
    {
        return database
            .promise()
            .execute(
                "SELECT * FROM properties WHERE property_id = ?", 
                [property_id]
            )
            .then(result => result[0]);
    }

    insert(entity)
    {
        return database
            .promise()
            .execute(
                "INSERT INTO properties (property_description, property_size, property_adress, property_city, property_zipcode, property_rooms, property_price, type_id) VALUES (?, ?, ?, ?, ?, ?, ?, ?)", 
                [entity.property_description, entity.property_size, entity.property_adress, entity.property_city, entity.property_zipcode, entity.property_rooms, entity.property_price, entity.type_id]
            )
            .then(result => result[0])
    }

    put(property_id, entity)
    {
        return database
            .promise()
            .query(
                "UPDATE properties SET ? WHERE property_id = ?", 
                [entity, property_id]
            )
            .then(result => result[0]);
    }

    delete(property_id)
    {
        return database
            .promise()
            .execute(
                "DELETE FROM properties WHERE property_id = ?", 
                [property_id]
            )
            .then(result => result[0]);
    }
}
