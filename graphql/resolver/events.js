const Event = require("../../models/Event");

module.exports = {
  events: async (args, req) => {
    try {
      if (!req.isAuth) {
        return new Error("Unauthorized user");
      }

      let allEvents = await Event.find();
      return allEvents;
    } catch (err) {
      console.log("err in get events :: ", err);
    }
  },

  createEvent: async (args, req) => {
    try {
      if (!req.isAuth) {
        return new Error("Unauthorized user");
      }

      let newEvent = new Event({
        title: args.eventInput.title,
        description: args.eventInput.description,
        price: args.eventInput.price,
      });
      await newEvent.save();

      // events.push(newEvent);
      return newEvent;
    } catch (err) {
      console.log("err in createEvent :: ", err);
    }
  },
};
