const Event = require("../../models/Event");
const User = require("../../models/User");
const bcrypt = require("bcryptjs");

module.exports = {
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
}