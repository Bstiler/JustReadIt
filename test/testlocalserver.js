const assert = require('chai').assert;
const nnloader = require('nnloader');
const axios = require('axios');

// Setup server
const app = require('../dist/handler').app;
const server = app.listen(4000, () => {
  console.log('Server Started!');
});
// Should you close the server?
const done = [false, false, false];

const fetcher = axios.create({
  headers: {
    'Content-Type': 'text/html',
  },
  baseURL: 'http://localhost:4000/',
});

/**
 * Closes the test server
 */
async function closeServer() {
  if (done.reduce((previous, current) => previous && current, true)) {
    server.close();
  } else {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    await closeServer();
  }
}

describe('Local Server tests.', () => {
  it('Testing sample 1', async () => {
    const input = await nnloader.loadString('test/samples/1/input.html', __dirname);

    let output = await nnloader.loadString('test/samples/1/output.html', __dirname);
    let given = (await fetcher.post('/text/html', input)).data;

    output = output.replace(/\s/g, '');
    given = given.replace(/\s/g, '');

    assert.strictEqual(given, output);
    done[0] = true;
  });

  it('Testing sample 2', async () => {
    const input = await nnloader.loadString('test/samples/2/input.html', __dirname);

    let output = await nnloader.loadString('test/samples/2/output.html', __dirname);
    let given = (await fetcher.post('/text/html', input)).data;

    output = output.replace(/\s/g, '');
    given = given.replace(/\s/g, '');

    assert.strictEqual(given, output);
    done[1] = true;
  });

  it('Fail this sample', async () => {
    const input = await nnloader.loadString('test/samples/2/input.html', __dirname);

    let output = await nnloader.loadString('test/samples/1/output.html', __dirname);
    let given = (await fetcher.post('/text/html', input)).data;

    output = output.replace(/\s/g, '');
    given = given.replace(/\s/g, '');

    assert.notStrictEqual(given, output);
    done[2] = true;
  });
});

closeServer();
