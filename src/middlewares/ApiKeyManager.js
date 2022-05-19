const uuidAPIKey = require('uuid-apikey');
uuidAPIKey.create();

const createdKeys = {
    apiKey: 'MH2ZFB1-2HS41TW-MAC3EN5-CKFSZV7',
    uuid: 'a445f7ac-1472-40eb-a298-375464df9fec'
}

module.exports = (request, response, next) =>
{
    next();
    return;


    const givenKey = request.header('X-Api-Key');

    // 01/ check that an api key is given
    if(!givenKey)
    {
        response.status(401).send('UNAUTHORIZED');
        return;
    }

    // 02/ check that the apikey match the uuid
    try
    {
        if(uuidAPIKey.check(givenKey, createdKeys.uuid))
        {
            next();
        }
    }
    catch(error)
    {
        response.status(401).send('UNAUTHORIZED');
        return;
    }
}