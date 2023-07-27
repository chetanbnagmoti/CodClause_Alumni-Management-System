const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  banner: {
    type: String,
    required: true,
  },
  eventName: {
    type: String,
    required: true,
  },
  scheduleFrom: {
    type: Date,
    required: true,
  },
  scheduleTo: {
    type: Date,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  timeFrom: {
    type: String, // Corrected data type to String
    required: true,
  },
  timeTo: {
    type: String, // Corrected data type to String
    required: true,
  },
});

const Event = mongoose.model("events", eventSchema);

module.exports = Event;
