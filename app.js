const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { graphqlHTTP } = require("express-graphql");
const { buildSchema } = require("graphql");
const mongoose = require("mongoose");
const dbUrl = "mongodb://localhost:27017/EventDB";
const Event = require("./models/Event");
const User = require("./models/User");
const bcrypt = require("bcryptjs");

// DB connection
mongoose.connect(dbUrl)
.then(() => {
    console.log("DB connected successfully.")
}).catch(err => {
    console.log("DB error :: ", err);
});

app.use(bodyParser.json());

app.use("/graphql", graphqlHTTP({
    schema: buildSchema(`
        type Event {
            _id: ID!
            title: String!
            description: String!
            price: Float!
        }

        type User {
            _id: ID!
            email: String!
            password: String!
        }
        
        input EventInput {
            title: String!
            description: String!
            price: Float!
        }

        input UserInput {
            email: String!,
            password: String!
        }

        type RootQuery {
            events: [Event!]!
        }

        type RootMutation {
            createEvent(eventInput: EventInput): Event
            createUser(userInput: UserInput): User
        }

        schema {
            query: RootQuery
            mutation: RootMutation
        }
    `),
    rootValue: {
        events: async (args) => {
            try {
                let allEvents = await Event.find();                
                return allEvents;
            } catch(err) {
                console.log("err in get events :: ", err);
            }
        },

        createEvent: async (args) => {
            try {
                let newEvent = new Event({
                    title: args.eventInput.title,
                    description: args.eventInput.description,
                    price: args.eventInput.price,
                });
                await newEvent.save();
                
                // events.push(newEvent);
                return newEvent;
            } catch(err) {
                console.log("err in createEvent :: ", err)
            }
        },

        createUser: async (args) => {
            try {
                // check if user already exist or not
                let findUser = await User.findOne({ email: args.userInput.email });
                if (findUser) {
                    return new Error("User already exist!")
                }

                let bcrypted = await bcrypt.hash(args.userInput.password, 10);
                let newUser = new User({
                    email: args.userInput.email,
                    password: bcrypted,
                });
                await newUser.save();
                
                return newUser;
            } catch(err) {
                console.log('err in createUser : ', err);
            }
        },
    },
    graphiql: true,
}))

app.listen(7000, () => {
    console.log("Listening to the port : ", 7000);
});