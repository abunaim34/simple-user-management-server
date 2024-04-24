const express = require('express')
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 3000

// middleware
app.use(cors())
app.use(express.json())


// const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.zyfftle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
const uri = `mongodb+srv://coffeeMaster:csNZSnzYMV0L3iC7@cluster0.zyfftle.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        // Connect the client to the server	(optional starting in v4.7)
        await client.connect();

        const usersCollection = client.db('coffeeDB').collection('users')

        app.get('/users', async(req, res) => {
          const users = usersCollection.find()
          const result = await users.toArray()
          res.send(result)
        })

        app.post('/users', async(req, res) => {
          const users = req.body
          console.log(users);
          const result = await usersCollection.insertOne(users)
          res.send(result)
        })

        // Send a ping to confirm a successful connection
        await client.db("admin").command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('User Management is runnig')
})

app.listen(port, () => {
  console.log(`User Managemnet runnig on port: ${port}`)
})