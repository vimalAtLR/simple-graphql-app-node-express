const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/EventDB";
const graphqlSchema = require('./graphql/schema/index');
const graphqlResolver = require('./graphql/resolver/index');
const auth = require('./middlewares/auth');


// DB connection
mongoose.connect(dbUrl)
.then(() => {
    console.log("DB connected successfully.")
}).catch(err => {
    console.log("DB error :: ", err);
});

// middlewares
app.use(bodyParser.json());
app.use(auth);
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'POST,GET,OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    next();
});

app.use("/graphql", graphqlHTTP({
    schema: graphqlSchema,
    rootValue: graphqlResolver,
    graphiql: true,
}))

app.listen(7000, () => {
    console.log("Listening to the port : ", 7000);
});