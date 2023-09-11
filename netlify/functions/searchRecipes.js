require('dotenv').config();
const axios = require('axios');
const process = require('process');

exports.handler = async (event, context) => {
  // export async function handler(event, context) {
  try {
    const { query } = event.queryStringParameters;
    const response = await axios.get(
      `https://forkify-api.herokuapp.com/api/v2/recipes/?search=${query}&key=${process.env.FOKRIFY_API_KEY}`,
      {
        headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' },
        params: { trophies: true },
      }
    );
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
