const appointmentStates = {
  PENDING: "PENDING",
  ACTIVE: "ACTIVE",
  CLOSED: "CLOSED"
};

const messageState = {
  PENDING: "PENDING",
  SEND: "SEND",
  CLOSED: "CLOSED",
  ERROR: "ERROR"
};

const messageCanal = {
  EMAIL: "EMAIL",
  SMS: "SMS"
};

const messageType = {
  NEWAPPOINTMENT: "NEWAPPOINTMENT"
};

exports.appointmentStates = appointmentStates;
exports.messageCanal = messageCanal;
exports.messageType = messageType;
exports.messageState = messageState;
