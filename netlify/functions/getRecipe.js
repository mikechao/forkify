require('dotenv').config();
const axios = require('axios');
const process = require('process');

exports.handler = async (event, context) => {
  // export async function handler(event, context) {
  try {
    const { id } = event.queryStringParameters;
    const url = `https://forkify-api.herokuapp.com/api/v2/recipes/${id}?key=${process.env.FOKRIFY_API_KEY}`;
    const response = await axios.get(url, {
      headers: { Accept: 'application/json', 'Accept-Encoding': 'identity' },
      params: { trophies: true },
    });
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
