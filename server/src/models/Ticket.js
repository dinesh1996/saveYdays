const mongoose = require('mongoose')
const Schema = mongoose.Schema

const TicketSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  ticketNumber: {
    type: String,

  },
  startDate: {
    type: Date,
    require: true,
    default: Date.now()
  },
  endDate: {
    type: Date,
    require: true
  },
  stages: {
    type: String,
    default: 'on-hold'
  },
  priority: {
    type: String,
    require: true
  }
}, {
  timestamps: true // Use Mongoose createdAt & updatedAt,
})

TicketSchema.options.toJSON = {
  getters: true,
  transform: function (doc, ret, options) {
    delete ret.__v
    return ret
  }
}

module.exports = mongoose.model('Ticket', TicketSchema)