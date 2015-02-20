### Usage

Make sure to [set up AWS credentials](http://docs.aws.amazon.com/AWSJavaScriptSDK/guide/node-configuring.html#Setting_AWS_Credentials). One way to achieve this is to create `~/.aws/credentials` with the following content:

    [default]
    aws_access_key_id = <YOUR_ACCESS_KEY_ID>
    aws_secret_access_key = <YOUR_SECRET_ACCESS_KEY>

Now, run `npm install`, and you are ready to go.

###### Set up

    var dynamodbStore = require('aws-dynamodb-store');

    dynamodbStore.init({ region: 'my-dynamodb-region', tableName: 'my-dynamodb-table-name' });

###### Store object

    dynamodbStore.create(myObject, function(err, createdObjectId) {
      if (err) {
        console.log(err);
      } else {
        console.log("Randomly generated unique object id: ", createdObjectId);
      }
    });
    
###### Get object

    dynamodbStore.get(objectId, function(err, object) {
      if (err) {
        console.log(err);
      } else {
        console.log("Retrieved object: ", object);
      }
    });
