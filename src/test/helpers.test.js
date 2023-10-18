import fetchMock from 'jest-fetch-mock';
import { async } from 'regenerator-runtime';
import { AJAX_SPOON_WIDGET } from '../js/helpers';

fetchMock.enableMocks();

describe('helper test', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it('should timeout', async () => {
    jest.useFakeTimers();
    fetch.mockResponseOnce(
      () =>
        new Promise(resolve => setTimeout(() => resolve({ body: 'ok' }), 1000))
    );
    // hold on to the Promise instead of await it so we can run jest.runAllTimers() to make the code timeout
    const asyncResults = AJAX_SPOON_WIDGET('http://google.com');
    jest.runAllTimers();
    expect(async () => {
      await asyncResults;
    }).rejects.toThrow('Request took too long! Timeout after 10 second');
  });

  it('should throw something went wrong error', async () => {
    const res = new Response('body', {
      status: 404,
      statusText: 'Not found',
      ok: false,
    });
    fetchMock.mockResponseOnce(() => Promise.resolve(res));
    expect(async () => {
      await AJAX_SPOON_WIDGET('http://google.com');
    }).rejects.toThrow('Something went wrong 404');
  });

  it('should return the fake data in the mock', async () => {
    const data = 'some testing values';
    const res = new Response(data, {
      status: 200,
      statusText: 'All good',
      ok: true,
    });
    fetchMock.mockResponseOnce(() => Promise.resolve(res));
    const result = await AJAX_SPOON_WIDGET('http://google.com');
    expect(result).toBe(data);
  });
});
