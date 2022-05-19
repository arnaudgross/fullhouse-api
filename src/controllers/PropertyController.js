const PropertyRepository = require('../repository/PropertyRepository');
const Property = new PropertyRepository();

const dataApiResponse = require('../services/dataApiResponse');

module.exports = class PropertyController
{
    getAll(request, response)
    {
        const page = (request.query.page || 1);
        const limit = 10;
        const offset = page * limit - limit;

        Property.countAll().then(function(count)
        {

            Property.selectAll(offset, limit).then(properties =>
            {
                response.status(200).json(dataApiResponse(properties, page, count, limit));
            })
            .catch((error) => 
            {
                response.status(500).send('INTERNAL SERVER ERROR');
            });

        });
    }

    getById(request, response)
    {
        const property_id = request.params.property_id;

        Property.selectById(property_id).then(property =>
        {
            response.status(200).json(dataApiResponse(property));
        })
        .catch(() => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }

    post(request, response)
    {
        let entity = {
            property_description : request.body.property_description,
            property_size : request.body.property_size,
            property_adress : request.body.property_adress,
            property_city : request.body.property_city,
            property_zipcode : request.body.property_zipcode,
            property_rooms : request.body.property_rooms,
            property_price : request.body.property_price,
            type_id : request.body.type_id
        };

        Property.insert(entity).then(result =>
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
        const property_id = request.params.property_id;

        let entity = {};
        let whitelisteFields = [
            'property_description',
            'property_size',
            'property_adress',
            'property_city',
            'property_zipcode',
            'property_rooms',
            'property_price',
            'type_id'
        ];

        whitelisteFields.forEach(function(field)
        {
            if(request.body[field]) entity[field] = request.body[field];
        });

        Property.put(property_id, entity).then(result =>
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
        const property_id = request.params.property_id;

        Property.delete(property_id).then(result =>
        {
            response.status(200).json(dataApiResponse(result));
        })
        .catch(() => 
        {
            response.status(500).send('INTERNAL SERVER ERROR');
        });
    }
}