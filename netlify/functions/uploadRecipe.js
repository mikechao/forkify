require('dotenv').config();
const axios = require('axios');
const process = require('process');

exports.handler = async (event, context) => {
  // export async function handler(event, context) {
  try {
    const { body } = event;
    const url = `https://forkify-api.herokuapp.com/api/v2/recipes/?key=${process.env.FOKRIFY_API_KEY}`;
    const response = await axios.post(url, body, {
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const data = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error }),
    };
  }
};
