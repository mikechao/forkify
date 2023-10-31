import fetchMock from 'jest-fetch-mock';
import * as testHelper from './testHelper';
import * as netlifyFunctions from '../js/netlifyFunctions';
import { async } from 'regenerator-runtime';
fetchMock.enableMocks();

describe('netlifyFunctions loadRecipe test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('is able to load with no errors', async () => {
    const mockData = testHelper.netlifyLoadReceipeResult();
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const id = '12345';
    const data = await netlifyFunctions.loadRecipe(id);
    expect(data).not.toBeNull();
    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `/.netlify/functions/getRecipe?id=${id}`,
      { headers: { accept: 'application/json' }, method: 'GET' }
    );
  });

  it('should throw the error when fetch fails', async () => {
    fetchMock.mockReject(new Error('API is down'));
    const id = '12345';
    expect(async () => {
      await netlifyFunctions.loadRecipe(id);
    }).rejects.toThrow('API is down');
  });
});

describe('netlifyFunctions deleteRecipe test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should be able to deleteRecipe', async () => {
    fetchMock.mockResponseOnce(JSON.stringify({ status: 200 }));
    const id = 'af12341hfh548';
    await netlifyFunctions.deleteRecipe(id);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `/.netlify/functions/deleteRecipe?id=${id}`,
      { method: 'DELETE' }
    );
  });

  it('should throw error when fetch fails in delete', async () => {
    fetchMock.mockReject(new Error('API is down, testing'));

    const id = 'af12341hfh548';
    expect(async () => {
      await netlifyFunctions.deleteRecipe(id);
    }).rejects.toThrow('API is down, testing');
  });
});

describe('netlifyFunctions searchRecipes test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should be able to searchRecipes', async () => {
    const mockData = testHelper.searchRecipesResults();
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const query = 'tea';
    const data = await netlifyFunctions.searchRecipes(query);
    expect(data).not.toBeNull();
    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(
      `/.netlify/functions/searchRecipes?query=${query}`,
      { headers: { accept: 'application/json' }, method: 'GET' }
    );
  });

  it('should throw the error when fetch fails', async () => {
    fetchMock.mockReject(new Error('Network unavailable'));
    const query = 'tea';
    expect(async () => {
      await netlifyFunctions.searchRecipes(query);
    }).rejects.toThrow('Network unavailable');
  });
});

describe('netlifyFunctions uploadRecipe test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should uploadRecipe', async () => {
    const recipe = testHelper.getRecipe();
    const mockData = {
      title: `Geeno's pizza`,
      publihser: 'Geeno',
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockData));
    const data = await netlifyFunctions.uploadRecipe(recipe);
    expect(data).not.toBeNull();
    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
    expect(fetchMock).toHaveBeenCalledWith(`/.netlify/functions/uploadRecipe`, {
      method: 'POST',
      body: JSON.stringify(recipe),
    });
  });

  it('should throw the error when fetch fails', async () => {
    fetchMock.mockReject(new Error('Broken pipe'));
    const recipe = testHelper.getRecipe();
    expect(async () => {
      await netlifyFunctions.uploadRecipe(recipe);
    }).rejects.toThrow('Broken pipe');
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});

describe('netlifyFunctions searchRecipes test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should return the mock data', async () => {
    const mockData = 'testing data 1234435';
    fetchMock.mockResponseOnce(mockData);
    const recipe = testHelper.getRecipe();
    const data = await netlifyFunctions.getNutritionWidget(recipe);
    expect(data).not.toBeNull();
    expect(data).toEqual(mockData);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });

  it('should throw the error when fetch fails', async () => {
    const message = 'Broken pipe';
    fetchMock.mockReject(new Error(message));
    const recipe = testHelper.getRecipe();
    recipe.ingredients.push({ quantity: 1, unit: 'oz', description: 'pets' });
    expect(
      async () => await netlifyFunctions.getNutritionWidget(recipe)
    ).rejects.toThrow(message);
    expect(fetchMock).toHaveBeenCalledTimes(1);
  });
});
