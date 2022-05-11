const express = require('express')
const cors = require('cors');
const app = express()
const port = process.env.PROT || 5000;
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require("dotenv").config()

app.use(cors())
app.use(express.json())
////////////////////////////ssss/////////////////

// connect your application


const uri = `mongodb+srv://${process.env.DB_USER2}:${process.env.DB_PASS2}@cluster0.6l0by.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        await client.connect()
        const service2Collection = client.db('geniusCar2').collection('service2');


        //// get maltipale data
        app.get('/service2', async (req, res) => {
            const query = {}
            const cursor = service2Collection.find(query);
            const services = await cursor.toArray()
            res.send(services)
        })

        /// get single data 
        app.get('/service2/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) }
            const service = await service2Collection.findOne(query)
            res.send(service)
        })

        //post data in data base
        app.post('/service2', async (req, res) => {
            const newService = req.body;
            const result = await service2Collection.insertOne(newService);
            res.send(result)
        })

        /// DELETE
        app.delete('/service2/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await service2Collection.deleteOne(query);
            res.send(result)
        })

    }

    finally {

    }
}

run().catch(console.dir);

//////////////////////////////////////////////////
app.get('/', (req, res) => {
    res.send('Hello ')
})

app.listen(port, () => {
    console.log('running ling', port)
})