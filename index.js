var uuid = require('node-uuid');
var AWS = require('aws-sdk');
var attr = require('dynamodb-data-types').AttributeValue;
var dynamodb = null;
var tableName = null;

function init(params) {
  params = params || {};

  if (!params.region) {
    throw new Error("'region' key must exist");
  }

  if (!params.tableName) {
    throw new Error("'tableName' key must exist");
  }

  dynamodb = new AWS.DynamoDB({ region: params.region });
  tableName = params.tableName;
}

function create(object, cb) {
  if (dynamodb === null) {
    throw new Error("Call init({ region: <region>, tableName: <table name> }) first");
  }

  object.id = uuid.v1();

  var params = {
    TableName: tableName,
    Item: attr.wrap(object)
  };

  dynamodb.putItem(params, function(err) {
    if (err) {
      cb(err);
    } else {
      cb(null, object.id);
    }
  });
}

function get(objectId, cb) {
  if (dynamodb === null) {
    throw new Error("Call init({ region: <region>, tableName: <table name> }) first");
  }

  var params = {
    TableName: tableName,
    Key: attr.wrap({
      id: objectId
    })
  };

  dynamodb.getItem(params, function(err, data) {
    if (err) {
      cb(err);
    } else {
      cb(null, attr.unwrap(data.Item));
    }
  });
}

module.exports = {
  init: init,
  create: create,
  get: get
};
