/**
 * @fileoverview gRPC-Web generated client stub for user
 * @enhanceable
 * @public
 */

// Code generated by protoc-gen-grpc-web. DO NOT EDIT.
// versions:
// 	protoc-gen-grpc-web v1.5.0
// 	protoc              v3.12.4
// source: user/user.proto


/* eslint-disable */
// @ts-nocheck



const grpc = {};
grpc.web = require('grpc-web');

const proto = {};
proto.user = require('./user_pb.js');

/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UserClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @param {string} hostname
 * @param {?Object} credentials
 * @param {?grpc.web.ClientOptions} options
 * @constructor
 * @struct
 * @final
 */
proto.user.UserPromiseClient =
    function(hostname, credentials, options) {
  if (!options) options = {};
  options.format = 'text';

  /**
   * @private @const {!grpc.web.GrpcWebClientBase} The client
   */
  this.client_ = new grpc.web.GrpcWebClientBase(options);

  /**
   * @private @const {string} The hostname
   */
  this.hostname_ = hostname.replace(/\/+$/, '');

};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.ListUsersRequest,
 *   !proto.user.ListUsersResponse>}
 */
const methodDescriptor_User_ListUsers = new grpc.web.MethodDescriptor(
  '/user.User/ListUsers',
  grpc.web.MethodType.UNARY,
  proto.user.ListUsersRequest,
  proto.user.ListUsersResponse,
  /**
   * @param {!proto.user.ListUsersRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.ListUsersResponse.deserializeBinary
);


/**
 * @param {!proto.user.ListUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.ListUsersResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.ListUsersResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserClient.prototype.listUsers =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.User/ListUsers',
      request,
      metadata || {},
      methodDescriptor_User_ListUsers,
      callback);
};


/**
 * @param {!proto.user.ListUsersRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.ListUsersResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserPromiseClient.prototype.listUsers =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.User/ListUsers',
      request,
      metadata || {},
      methodDescriptor_User_ListUsers);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.GetUserRequest,
 *   !proto.user.GetUserResponse>}
 */
const methodDescriptor_User_GetUser = new grpc.web.MethodDescriptor(
  '/user.User/GetUser',
  grpc.web.MethodType.UNARY,
  proto.user.GetUserRequest,
  proto.user.GetUserResponse,
  /**
   * @param {!proto.user.GetUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.GetUserResponse.deserializeBinary
);


/**
 * @param {!proto.user.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.GetUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.GetUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserClient.prototype.getUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.User/GetUser',
      request,
      metadata || {},
      methodDescriptor_User_GetUser,
      callback);
};


/**
 * @param {!proto.user.GetUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.GetUserResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserPromiseClient.prototype.getUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.User/GetUser',
      request,
      metadata || {},
      methodDescriptor_User_GetUser);
};


/**
 * @const
 * @type {!grpc.web.MethodDescriptor<
 *   !proto.user.AlterUserRequest,
 *   !proto.user.AlterUserResponse>}
 */
const methodDescriptor_User_AlterUser = new grpc.web.MethodDescriptor(
  '/user.User/AlterUser',
  grpc.web.MethodType.UNARY,
  proto.user.AlterUserRequest,
  proto.user.AlterUserResponse,
  /**
   * @param {!proto.user.AlterUserRequest} request
   * @return {!Uint8Array}
   */
  function(request) {
    return request.serializeBinary();
  },
  proto.user.AlterUserResponse.deserializeBinary
);


/**
 * @param {!proto.user.AlterUserRequest} request The
 *     request proto
 * @param {?Object<string, string>} metadata User defined
 *     call metadata
 * @param {function(?grpc.web.RpcError, ?proto.user.AlterUserResponse)}
 *     callback The callback function(error, response)
 * @return {!grpc.web.ClientReadableStream<!proto.user.AlterUserResponse>|undefined}
 *     The XHR Node Readable Stream
 */
proto.user.UserClient.prototype.alterUser =
    function(request, metadata, callback) {
  return this.client_.rpcCall(this.hostname_ +
      '/user.User/AlterUser',
      request,
      metadata || {},
      methodDescriptor_User_AlterUser,
      callback);
};


/**
 * @param {!proto.user.AlterUserRequest} request The
 *     request proto
 * @param {?Object<string, string>=} metadata User defined
 *     call metadata
 * @return {!Promise<!proto.user.AlterUserResponse>}
 *     Promise that resolves to the response
 */
proto.user.UserPromiseClient.prototype.alterUser =
    function(request, metadata) {
  return this.client_.unaryCall(this.hostname_ +
      '/user.User/AlterUser',
      request,
      metadata || {},
      methodDescriptor_User_AlterUser);
};


module.exports = proto.user;

