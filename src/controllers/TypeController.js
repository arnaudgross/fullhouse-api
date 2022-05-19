const TypeRepository = require('../repository/TypeRepository');
const Type = new TypeRepository();

const dataApiResponse = require('../services/dataApiResponse');

module.exports = class TypeController
{
    getAll(request, response)
    {
        Type.selectAll().then(types =>
        {
            response.status(200).json(dataApiResponse(types));
        })
        .catch((error) => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }

    getById(request, response)
    {
        const type_id = request.params.type_id;

        Type.selectById(type_id).then(type =>
        {
            response.status(200).json(dataApiResponse(type));
        })
        .catch(() => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }

    post(request, response)
    {
        let entity = {
            type_name : request.body.type_name,
            type_slug : request.body.type_slug
        };

        Type.insert(entity).then(result =>
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
        const type_id = request.params.type_id;

        let entity = {};
        let whitelisteFields = ['type_name', 'type_slug'];

        whitelisteFields.forEach(function(field)
        {
            if(request.body[field]) entity[field] = request.body[field];
        });

        Type.put(type_id, entity).then(result =>
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
        const type_id = request.params.type_id;

        Type.delete(type_id).then(result =>
        {
            response.status(200).json(dataApiResponse(result));
        })
        .catch(() => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }
}