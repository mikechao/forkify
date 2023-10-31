require('dotenv').config();
const axios = require('axios');
const process = require('process');

exports.handler = async (event, context) => {
  try {
    const ings = event.queryStringParameters.ings;
    const servings = event.queryStringParameters.servings;
    const spoonAPIURL = `https://api.spoonacular.com/recipes/visualizeNutrition`;
    const postData = {
      apiKey: `${process.env.SPOON_API_KEY}`,
      showBacklink: true,
      defaultCss: true,
      servings: `${servings}`,
      ingredientList: `${ings}`,
    };
    const headers = {
      Accept: 'text/html',
      'Content-Type': 'application/x-www-form-urlencoded',
    };
    const response = await axios.post(spoonAPIURL, postData, {
      headers: headers,
    });
    const data = await response.data;
    return {
      statusCode: 200,
      body: data,
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify(error),
    };
  }
};
