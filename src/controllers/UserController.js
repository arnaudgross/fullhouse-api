const UserRepository = require('../repository/UserRepository');
const User = new UserRepository();

const dataApiResponse = require('../services/dataApiResponse');

module.exports = class UserController
{
    getAll(request, response)
    {
        const page = (request.query.page || 1);
        const limit = 10;
        const offset = page * limit - limit;

        User.countAll().then(function(count)
        {

            User.selectAll(offset, limit).then(users =>
            {
                response.status(200).json(dataApiResponse(users, page, count, limit));
            })
            .catch((error) => 
            {
                response.status(500).send('INTERNAL SERVER ERROR');
            });

        });
    }

    getById(request, response)
    {
        const user_id = request.params.user_id;

        User.selectById(user_id).then(user =>
        {
            response.status(200).json(dataApiResponse(user));
        })
        .catch(() => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }

    post(request, response)
    {
        let entity = {
            user_firstname : request.body.user_firstname,
            user_lastname : request.body.user_lastname,
            user_email : request.body.user_email,
            user_password : request.body.user_password
        };

        User.insert(entity).then(result =>
        {
            response.status(201).json(dataApiResponse(result));
        })
        .catch((error) => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }

    put(request, response)
    {
        const user_id = request.params.user_id;

        let entity = {};
        let whitelisteFields = ['user_firstname', 'user_lastname', 'user_email', 'user_password'];

        whitelisteFields.forEach(function(field)
        {
            if(request.body[field]) entity[field] = request.body[field];
        });

        User.put(user_id, entity).then(result =>
        {
            response.status(200).json(dataApiResponse(result));
        })
        .catch((err) => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }

    delete(request, response)
    {
        const user_id = request.params.user_id;

        User.delete(user_id).then(result =>
        {
            response.status(200).json(dataApiResponse(result));
        })
        .catch(() => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }
}