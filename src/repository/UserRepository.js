const database = require('../../api/database');
 
module.exports = class UserRepository
{
    selectAll(offset = 0, limit = 100)
    {
        return database
            .promise()
            .execute(
                "SELECT * FROM users LIMIT ?, ?", 
                [offset, limit]
            )
            .then(result => result[0]);
    }

    countAll(offset = 0, limit = 100)
    {
        return database
            .promise()
            .execute("SELECT COUNT(*) AS count FROM users")
            .then(result => result[0][0].count);
    }

    selectById(user_id)
    {
        return database
            .promise()
            .execute(
                "SELECT user_id, user_firstname, user_lastname, user_email, user_date FROM users WHERE users.user_id = ?", 
                [user_id]
            )
            .then(result => result[0]);
    }

    insert(entity)
    {
        return database
            .promise()
            .execute(
                "INSERT INTO users (user_firstname, user_lastname, user_email, user_password, user_date) VALUES (?, ?, ?, ?, NOW())", 
                [entity.user_firstname, entity.user_lastname, entity.user_email, entity.user_password]
            )
            .then(result => result[0])
    }

    put(user_id, entity)
    {
        return database
            .promise()
            .query(
                "UPDATE users SET ? WHERE user_id = ?", 
                [entity, user_id]
            )
            .then(result => result[0]);
    }

    delete(user_id)
    {
        return database
            .promise()
            .execute(
                "DELETE FROM users WHERE user_id = ?", 
                [user_id]
            )
            .then(result => result[0]);
    }
}
