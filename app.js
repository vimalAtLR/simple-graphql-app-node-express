const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");

app.use(bodyParser.json());
let events = [];

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
        }
        input EventInput {
            title: String!
            description: String!
            price: Float!
        }
        type RootQuery {
            events: [Event!]!
        }
        type RootMutation {
            createEvent(eventInput: EventInput): Event
        }
        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: (args) => {
            return events;
        },
        createEvent: (args) => {
            let newEvent = {
                _id: Math.random().toString(),
                title: args.eventInput.title,
                description: args.eventInput.description,
                price: args.eventInput.price,
            }
            events.push(newEvent);
            return newEvent;
        }
    },
    graphiql: true,
}))

app.listen(7000, () => {
    console.log("Listening to the port : ", 7000);
});