

/**
 * @type {import('@types/aws-lambda').APIGatewayProxyHandler}
 */
const AWS = require("aws-sdk");
const ddb = new AWS.DynamoDB.DocumentClient();

const tableName = "Game-khb7nfziubg7ppsjrpjxw7neiy-staging"; // Replace with your DynamoDB Table name

const EARTH_RADIUS_MILES = 3958.8;

exports.handler = async(event) => {
    console.log(event);
    const userLat = event.arguments.latitude;
    const userLong = event.arguments.longitude;
    const distance = 5; // 5 miles
  
    // Approximate bounding box calculations
    const latDelta = distance / EARTH_RADIUS_MILES * (180 / Math.PI);
    const longDelta = distance / (EARTH_RADIUS_MILES * Math.cos(userLat * Math.PI / 180)) * (180 / Math.PI);

    const minLat = userLat - latDelta;
    const maxLat = userLat + latDelta;
    console.log("lat", minLat, maxLat);
    const minLong = userLong - longDelta;
    const maxLong = userLong + longDelta;
    console.log("lng", minLong, maxLong);

    const params = {
    TableName: tableName,
    FilterExpression: "#latitude BETWEEN :minLat AND :maxLat AND #longitude BETWEEN :minLong AND :maxLong",
    ExpressionAttributeNames: {
        "#latitude": "latitude",
        "#longitude": "longitude",
    },
    ExpressionAttributeValues: {
        ":minLat": minLat,
        ":maxLat": maxLat,
        ":minLong": minLong,
        ":maxLong": maxLong,
    }
    };

    try {
    const result = await ddb.scan(params).promise();
    console.log(result);
    return result.Items;
    } catch (error) {
    console.error("Error querying the database", error);
    return null;
    }
};