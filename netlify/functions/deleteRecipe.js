require('dotenv').config();
const axios = require('axios');
const process = require('process');

exports.handler = async (event, context) => {
  // export async function handler(event, context) {
  try {
    const { id } = event.queryStringParameters;
    const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${process.env.FOKRIFY_API_KEY}`;
    const response = await axios.delete(url, {
      headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' },
      params: { trophies: true },
    });

    return {
      statusCode: 204,
    };
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
