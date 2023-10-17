import { async } from 'regenerator-runtime';
import { TIMEOUT_SEC } from './config';

const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const AJAX_SPOON_WIDGET = async function (url) {
  try {
    const fetchPro = fetch(url, {
      method: 'POST',
      headers: {
        Accept: 'text/html',
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
    const res = await Promise.race([fetchPro, timeout(TIMEOUT_SEC)]);
    const data = await res.text();
    if (!res.ok) throw new Error(`Something went wrong ${res.status}`);
    return data;
  } catch (err) {
    throw err;
  }
};
