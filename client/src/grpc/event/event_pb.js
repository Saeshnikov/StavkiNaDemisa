// source: event/event.proto
/**
 * @fileoverview
 * @enhanceable
 * @suppress {messageConventions} JS Compiler reports an error if a variable or
 *     field starts with 'MSG_' and isn't a translatable message.
 * @public
 */
// GENERATED CODE -- DO NOT EDIT!

var jspb = require('google-protobuf');
var goog = jspb;
var global = Function('return this')();

goog.exportSymbol('proto.event.EventInfo', null, global);
goog.exportSymbol('proto.event.EventResult', null, global);
goog.exportSymbol('proto.event.ListEventsRequest', null, global);
goog.exportSymbol('proto.event.ListEventsResponse', null, global);
goog.exportSymbol('proto.event.NewEventRequest', null, global);
goog.exportSymbol('proto.event.NewEventResponse', null, global);
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event.NewEventRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event.NewEventRequest.repeatedFields_, null);
};
goog.inherits(proto.event.NewEventRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event.NewEventRequest.displayName = 'proto.event.NewEventRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event.NewEventResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event.NewEventResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event.NewEventResponse.displayName = 'proto.event.NewEventResponse';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event.EventInfo = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event.EventInfo.repeatedFields_, null);
};
goog.inherits(proto.event.EventInfo, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event.EventInfo.displayName = 'proto.event.EventInfo';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event.ListEventsRequest = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, null, null);
};
goog.inherits(proto.event.ListEventsRequest, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event.ListEventsRequest.displayName = 'proto.event.ListEventsRequest';
}
/**
 * Generated by JsPbCodeGenerator.
 * @param {Array=} opt_data Optional initial data array, typically from a
 * server response, or constructed directly in Javascript. The array is used
 * in place and becomes part of the constructed object. It is not cloned.
 * If no data is provided, the constructed object will be empty, but still
 * valid.
 * @extends {jspb.Message}
 * @constructor
 */
proto.event.ListEventsResponse = function(opt_data) {
  jspb.Message.initialize(this, opt_data, 0, -1, proto.event.ListEventsResponse.repeatedFields_, null);
};
goog.inherits(proto.event.ListEventsResponse, jspb.Message);
if (goog.DEBUG && !COMPILED) {
  /**
   * @public
   * @override
   */
  proto.event.ListEventsResponse.displayName = 'proto.event.ListEventsResponse';
}

/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event.NewEventRequest.repeatedFields_ = [3];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event.NewEventRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.event.NewEventRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event.NewEventRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.NewEventRequest.toObject = function(includeInstance, msg) {
  var f, obj = {
    name: jspb.Message.getFieldWithDefault(msg, 1, ""),
    description: jspb.Message.getFieldWithDefault(msg, 2, ""),
    excludedUsersList: (f = jspb.Message.getRepeatedField(msg, 3)) == null ? undefined : f,
    judge: jspb.Message.getFieldWithDefault(msg, 4, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event.NewEventRequest}
 */
proto.event.NewEventRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event.NewEventRequest;
  return proto.event.NewEventRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event.NewEventRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event.NewEventRequest}
 */
proto.event.NewEventRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 3:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt32());
      msg.setExcludedUsersList(value);
      break;
    case 4:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setJudge(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event.NewEventRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event.NewEventRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event.NewEventRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.NewEventRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      1,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getExcludedUsersList();
  if (f.length > 0) {
    writer.writePackedInt32(
      3,
      f
    );
  }
  f = message.getJudge();
  if (f !== 0) {
    writer.writeInt32(
      4,
      f
    );
  }
};


/**
 * optional string name = 1;
 * @return {string}
 */
proto.event.NewEventRequest.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 1, ""));
};


/**
 * @param {string} value
 * @return {!proto.event.NewEventRequest} returns this
 */
proto.event.NewEventRequest.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 1, value);
};


/**
 * optional string description = 2;
 * @return {string}
 */
proto.event.NewEventRequest.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event.NewEventRequest} returns this
 */
proto.event.NewEventRequest.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * repeated int32 excluded_users = 3;
 * @return {!Array<number>}
 */
proto.event.NewEventRequest.prototype.getExcludedUsersList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 3));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.event.NewEventRequest} returns this
 */
proto.event.NewEventRequest.prototype.setExcludedUsersList = function(value) {
  return jspb.Message.setField(this, 3, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.event.NewEventRequest} returns this
 */
proto.event.NewEventRequest.prototype.addExcludedUsers = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 3, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event.NewEventRequest} returns this
 */
proto.event.NewEventRequest.prototype.clearExcludedUsersList = function() {
  return this.setExcludedUsersList([]);
};


/**
 * optional int32 judge = 4;
 * @return {number}
 */
proto.event.NewEventRequest.prototype.getJudge = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 4, 0));
};


/**
 * @param {number} value
 * @return {!proto.event.NewEventRequest} returns this
 */
proto.event.NewEventRequest.prototype.setJudge = function(value) {
  return jspb.Message.setProto3IntField(this, 4, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event.NewEventResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.event.NewEventResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event.NewEventResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.NewEventResponse.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event.NewEventResponse}
 */
proto.event.NewEventResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event.NewEventResponse;
  return proto.event.NewEventResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event.NewEventResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event.NewEventResponse}
 */
proto.event.NewEventResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event.NewEventResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event.NewEventResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event.NewEventResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.NewEventResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event.EventInfo.repeatedFields_ = [8];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event.EventInfo.prototype.toObject = function(opt_includeInstance) {
  return proto.event.EventInfo.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event.EventInfo} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.EventInfo.toObject = function(includeInstance, msg) {
  var f, obj = {
    eventId: jspb.Message.getFieldWithDefault(msg, 1, 0),
    name: jspb.Message.getFieldWithDefault(msg, 2, ""),
    description: jspb.Message.getFieldWithDefault(msg, 3, ""),
    closed: jspb.Message.getBooleanFieldWithDefault(msg, 4, false),
    result: jspb.Message.getFieldWithDefault(msg, 5, 0),
    coefY: jspb.Message.getFloatingPointFieldWithDefault(msg, 6, 0.0),
    coefN: jspb.Message.getFloatingPointFieldWithDefault(msg, 7, 0.0),
    excludedUsersList: (f = jspb.Message.getRepeatedField(msg, 8)) == null ? undefined : f,
    judge: jspb.Message.getFieldWithDefault(msg, 9, 0),
    author: jspb.Message.getFieldWithDefault(msg, 10, 0)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event.EventInfo}
 */
proto.event.EventInfo.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event.EventInfo;
  return proto.event.EventInfo.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event.EventInfo} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event.EventInfo}
 */
proto.event.EventInfo.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setEventId(value);
      break;
    case 2:
      var value = /** @type {string} */ (reader.readString());
      msg.setName(value);
      break;
    case 3:
      var value = /** @type {string} */ (reader.readString());
      msg.setDescription(value);
      break;
    case 4:
      var value = /** @type {boolean} */ (reader.readBool());
      msg.setClosed(value);
      break;
    case 5:
      var value = /** @type {!proto.event.EventResult} */ (reader.readEnum());
      msg.setResult(value);
      break;
    case 6:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setCoefY(value);
      break;
    case 7:
      var value = /** @type {number} */ (reader.readFloat());
      msg.setCoefN(value);
      break;
    case 8:
      var value = /** @type {!Array<number>} */ (reader.readPackedInt32());
      msg.setExcludedUsersList(value);
      break;
    case 9:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setJudge(value);
      break;
    case 10:
      var value = /** @type {number} */ (reader.readInt32());
      msg.setAuthor(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event.EventInfo.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event.EventInfo.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event.EventInfo} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.EventInfo.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getEventId();
  if (f !== 0) {
    writer.writeInt32(
      1,
      f
    );
  }
  f = message.getName();
  if (f.length > 0) {
    writer.writeString(
      2,
      f
    );
  }
  f = message.getDescription();
  if (f.length > 0) {
    writer.writeString(
      3,
      f
    );
  }
  f = message.getClosed();
  if (f) {
    writer.writeBool(
      4,
      f
    );
  }
  f = message.getResult();
  if (f !== 0.0) {
    writer.writeEnum(
      5,
      f
    );
  }
  f = message.getCoefY();
  if (f !== 0.0) {
    writer.writeFloat(
      6,
      f
    );
  }
  f = message.getCoefN();
  if (f !== 0.0) {
    writer.writeFloat(
      7,
      f
    );
  }
  f = message.getExcludedUsersList();
  if (f.length > 0) {
    writer.writePackedInt32(
      8,
      f
    );
  }
  f = message.getJudge();
  if (f !== 0) {
    writer.writeInt32(
      9,
      f
    );
  }
  f = message.getAuthor();
  if (f !== 0) {
    writer.writeInt32(
      10,
      f
    );
  }
};


/**
 * optional int32 event_id = 1;
 * @return {number}
 */
proto.event.EventInfo.prototype.getEventId = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 1, 0));
};


/**
 * @param {number} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setEventId = function(value) {
  return jspb.Message.setProto3IntField(this, 1, value);
};


/**
 * optional string name = 2;
 * @return {string}
 */
proto.event.EventInfo.prototype.getName = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 2, ""));
};


/**
 * @param {string} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setName = function(value) {
  return jspb.Message.setProto3StringField(this, 2, value);
};


/**
 * optional string description = 3;
 * @return {string}
 */
proto.event.EventInfo.prototype.getDescription = function() {
  return /** @type {string} */ (jspb.Message.getFieldWithDefault(this, 3, ""));
};


/**
 * @param {string} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setDescription = function(value) {
  return jspb.Message.setProto3StringField(this, 3, value);
};


/**
 * optional bool closed = 4;
 * @return {boolean}
 */
proto.event.EventInfo.prototype.getClosed = function() {
  return /** @type {boolean} */ (jspb.Message.getBooleanFieldWithDefault(this, 4, false));
};


/**
 * @param {boolean} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setClosed = function(value) {
  return jspb.Message.setProto3BooleanField(this, 4, value);
};


/**
 * optional EventResult result = 5;
 * @return {!proto.event.EventResult}
 */
proto.event.EventInfo.prototype.getResult = function() {
  return /** @type {!proto.event.EventResult} */ (jspb.Message.getFieldWithDefault(this, 5, 0));
};


/**
 * @param {!proto.event.EventResult} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setResult = function(value) {
  return jspb.Message.setProto3EnumField(this, 5, value);
};


/**
 * optional float coef_y = 6;
 * @return {number}
 */
proto.event.EventInfo.prototype.getCoefY = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 6, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setCoefY = function(value) {
  return jspb.Message.setProto3FloatField(this, 6, value);
};


/**
 * optional float coef_n = 7;
 * @return {number}
 */
proto.event.EventInfo.prototype.getCoefN = function() {
  return /** @type {number} */ (jspb.Message.getFloatingPointFieldWithDefault(this, 7, 0.0));
};


/**
 * @param {number} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setCoefN = function(value) {
  return jspb.Message.setProto3FloatField(this, 7, value);
};


/**
 * repeated int32 excluded_users = 8;
 * @return {!Array<number>}
 */
proto.event.EventInfo.prototype.getExcludedUsersList = function() {
  return /** @type {!Array<number>} */ (jspb.Message.getRepeatedField(this, 8));
};


/**
 * @param {!Array<number>} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setExcludedUsersList = function(value) {
  return jspb.Message.setField(this, 8, value || []);
};


/**
 * @param {number} value
 * @param {number=} opt_index
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.addExcludedUsers = function(value, opt_index) {
  return jspb.Message.addToRepeatedField(this, 8, value, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.clearExcludedUsersList = function() {
  return this.setExcludedUsersList([]);
};


/**
 * optional int32 judge = 9;
 * @return {number}
 */
proto.event.EventInfo.prototype.getJudge = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 9, 0));
};


/**
 * @param {number} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setJudge = function(value) {
  return jspb.Message.setProto3IntField(this, 9, value);
};


/**
 * optional int32 author = 10;
 * @return {number}
 */
proto.event.EventInfo.prototype.getAuthor = function() {
  return /** @type {number} */ (jspb.Message.getFieldWithDefault(this, 10, 0));
};


/**
 * @param {number} value
 * @return {!proto.event.EventInfo} returns this
 */
proto.event.EventInfo.prototype.setAuthor = function(value) {
  return jspb.Message.setProto3IntField(this, 10, value);
};





if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event.ListEventsRequest.prototype.toObject = function(opt_includeInstance) {
  return proto.event.ListEventsRequest.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event.ListEventsRequest} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.ListEventsRequest.toObject = function(includeInstance, msg) {
  var f, obj = {

  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event.ListEventsRequest}
 */
proto.event.ListEventsRequest.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event.ListEventsRequest;
  return proto.event.ListEventsRequest.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event.ListEventsRequest} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event.ListEventsRequest}
 */
proto.event.ListEventsRequest.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event.ListEventsRequest.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event.ListEventsRequest.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event.ListEventsRequest} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.ListEventsRequest.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
};



/**
 * List of repeated fields within this message type.
 * @private {!Array<number>}
 * @const
 */
proto.event.ListEventsResponse.repeatedFields_ = [1];



if (jspb.Message.GENERATE_TO_OBJECT) {
/**
 * Creates an object representation of this proto.
 * Field names that are reserved in JavaScript and will be renamed to pb_name.
 * Optional fields that are not set will be set to undefined.
 * To access a reserved field use, foo.pb_<name>, eg, foo.pb_default.
 * For the list of reserved names please see:
 *     net/proto2/compiler/js/internal/generator.cc#kKeyword.
 * @param {boolean=} opt_includeInstance Deprecated. whether to include the
 *     JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @return {!Object}
 */
proto.event.ListEventsResponse.prototype.toObject = function(opt_includeInstance) {
  return proto.event.ListEventsResponse.toObject(opt_includeInstance, this);
};


/**
 * Static version of the {@see toObject} method.
 * @param {boolean|undefined} includeInstance Deprecated. Whether to include
 *     the JSPB instance for transitional soy proto support:
 *     http://goto/soy-param-migration
 * @param {!proto.event.ListEventsResponse} msg The msg instance to transform.
 * @return {!Object}
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.ListEventsResponse.toObject = function(includeInstance, msg) {
  var f, obj = {
    infoList: jspb.Message.toObjectList(msg.getInfoList(),
    proto.event.EventInfo.toObject, includeInstance)
  };

  if (includeInstance) {
    obj.$jspbMessageInstance = msg;
  }
  return obj;
};
}


/**
 * Deserializes binary data (in protobuf wire format).
 * @param {jspb.ByteSource} bytes The bytes to deserialize.
 * @return {!proto.event.ListEventsResponse}
 */
proto.event.ListEventsResponse.deserializeBinary = function(bytes) {
  var reader = new jspb.BinaryReader(bytes);
  var msg = new proto.event.ListEventsResponse;
  return proto.event.ListEventsResponse.deserializeBinaryFromReader(msg, reader);
};


/**
 * Deserializes binary data (in protobuf wire format) from the
 * given reader into the given message object.
 * @param {!proto.event.ListEventsResponse} msg The message object to deserialize into.
 * @param {!jspb.BinaryReader} reader The BinaryReader to use.
 * @return {!proto.event.ListEventsResponse}
 */
proto.event.ListEventsResponse.deserializeBinaryFromReader = function(msg, reader) {
  while (reader.nextField()) {
    if (reader.isEndGroup()) {
      break;
    }
    var field = reader.getFieldNumber();
    switch (field) {
    case 1:
      var value = new proto.event.EventInfo;
      reader.readMessage(value,proto.event.EventInfo.deserializeBinaryFromReader);
      msg.addInfo(value);
      break;
    default:
      reader.skipField();
      break;
    }
  }
  return msg;
};


/**
 * Serializes the message to binary data (in protobuf wire format).
 * @return {!Uint8Array}
 */
proto.event.ListEventsResponse.prototype.serializeBinary = function() {
  var writer = new jspb.BinaryWriter();
  proto.event.ListEventsResponse.serializeBinaryToWriter(this, writer);
  return writer.getResultBuffer();
};


/**
 * Serializes the given message to binary data (in protobuf wire
 * format), writing to the given BinaryWriter.
 * @param {!proto.event.ListEventsResponse} message
 * @param {!jspb.BinaryWriter} writer
 * @suppress {unusedLocalVariables} f is only used for nested messages
 */
proto.event.ListEventsResponse.serializeBinaryToWriter = function(message, writer) {
  var f = undefined;
  f = message.getInfoList();
  if (f.length > 0) {
    writer.writeRepeatedMessage(
      1,
      f,
      proto.event.EventInfo.serializeBinaryToWriter
    );
  }
};


/**
 * repeated EventInfo info = 1;
 * @return {!Array<!proto.event.EventInfo>}
 */
proto.event.ListEventsResponse.prototype.getInfoList = function() {
  return /** @type{!Array<!proto.event.EventInfo>} */ (
    jspb.Message.getRepeatedWrapperField(this, proto.event.EventInfo, 1));
};


/**
 * @param {!Array<!proto.event.EventInfo>} value
 * @return {!proto.event.ListEventsResponse} returns this
*/
proto.event.ListEventsResponse.prototype.setInfoList = function(value) {
  return jspb.Message.setRepeatedWrapperField(this, 1, value);
};


/**
 * @param {!proto.event.EventInfo=} opt_value
 * @param {number=} opt_index
 * @return {!proto.event.EventInfo}
 */
proto.event.ListEventsResponse.prototype.addInfo = function(opt_value, opt_index) {
  return jspb.Message.addToRepeatedWrapperField(this, 1, opt_value, proto.event.EventInfo, opt_index);
};


/**
 * Clears the list making it empty but non-null.
 * @return {!proto.event.ListEventsResponse} returns this
 */
proto.event.ListEventsResponse.prototype.clearInfoList = function() {
  return this.setInfoList([]);
};


/**
 * @enum {number}
 */
proto.event.EventResult = {
  UNDEFINED: 0,
  YES: 1,
  NO: 2,
  DECLINED: 3
};

goog.object.extend(exports, proto.event);
