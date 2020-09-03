const { MongoClient } = require('mongodb');
let config = require('./../../config/config.json')
let DbConnection = function () {

    let connection = null;
    var instance = 0;
    const dataBase = config.dataBaseName;
    console.log("Initialising MongoDB connection")

    async function DbConnect() {
        instance++;
        const client = new MongoClient(config.mongoUri, { useUnifiedTopology: true });
        try {
            await client.connect();
            connection = client;
            return client;
        } catch (e) {
            return null;
        }
    }


    async function insertDocument(collection, newListing) {
        if (!connection) {
            console.log(`getting new db connection`);
            connection = await DbConnect();
        }
        try {
            let result;
            if (Array.isArray(newListing) && newListing.length) {
                result = await connection.db(dataBase).collection(collection).insertMany(newListing);
            } else if (Object.keys(newListing).length) {
                result = await connection.db(dataBase).collection(collection).insertOne(newListing);
            } else {
                return false
            }
            console.log(`New listing created with the following id: ${result.insertedId}`, JSON.stringify(result));
            if (result.insertedCount > 0) {
                return true;
            } else {
                return false
            }
        } catch (e) {
            return false
        }



    }

    async function findOne(collection, nameOfListing) {

        if (!connection) {
            console.log(`getting new db connection`);
            connection = await DbConnect();
        }
        let result;
        try {
            result = await connection
                .db(dataBase)
                .collection(collection)
                .findOne(nameOfListing, { projection: { _id: 0 } });
        } catch (e) {
            console.log(JSON.stringify(e))
            return "server error"
        }

        if (result) {
            console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
            console.log(result);
            return result;
        } else {
            console.log(`No listings found with the name '${nameOfListing}'`);
            console.log(result);
            return [];
        }
    }

    async function find(collection, nameOfListing, sort) {

        if (!connection) {
            console.log(`getting new db connection`);
            connection = await DbConnect();
        }
        let result;
        try {
            if (!Object.keys(sort).length) {
                result = await connection
                    .db(dataBase)
                    .collection(collection)
                    .find(nameOfListing, { projection: { _id: 0 } })
                    .limit(Number.MAX_SAFE_INTEGER);
            } else {
                result = await connection
                    .db(dataBase)
                    .collection(collection)
                    .find(nameOfListing)
                    .sort(sort)
                    .limit(Number.MAX_SAFE_INTEGER);
            }
            result = await result.toArray();
        } catch (e) {
            console.log(JSON.stringify(e))
            return "server error"
        }

        if (result.length) {
            console.log(`Found a listing in the collection with the name '${nameOfListing}':`);
            console.log(result);
            return result;
        } else {
            console.log(`No listings found with the name '${nameOfListing}'`);
            console.log(result);
            return result
        }
    }

    async function getSequenceNextValue(query) {
        console.log(query)
        let updateResult = await connection.db(dataBase).collection("sequenceCounter")
            .findOneAndUpdate(query, { $inc: { seqValue: 1 } })
        console.log("Sequence Result:", JSON.stringify(updateResult));

        if (updateResult.lastErrorObject.updatedExisting) {
            let result = await findOne("sequenceCounter", query);
            console.log("find result:", JSON.stringify(result));
            if (result.seqValue) {
                console.log("returning seq value", result.seqValue)
                return result.seqValue;
            } else {
                return null
            }
        }
    }
    return {
        DbConnect: DbConnect,
        insertDocument: insertDocument,
        findOne: findOne,
        find: find,
        getNewCustomerId: getSequenceNextValue
    }
}
module.exports = DbConnection();