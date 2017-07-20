const { Application } = require('spectron');
const electron = require('electron');

const app = new Application({ path: electron, args: ['.'] });

afterAll(async () => {
    if (app && app.isRunning()) app.stop();
});

test('error in spectron function', async () => {
    await app.start();
    await app.client.click('#does_not_exists');

    // outputs to console just `Error`
    // and loses valuable description of an error
});

test.only('wrapped error in spectron function', async () => {
    try {
        await app.start();
        await app.client.click('#does_not_exists');
    } catch (error) {
        throw new Error(error);

        // this will output error description:
        // `Error: An element could not be located on the page using the given search parameters`
    }
});

const func = async () => {
    throw new Error('Descriptive error payload');
};

test('error in simple async function doesn’t lose descriptive error payload', async () => {
    // so this is likely not an issue with jest
    await func();
});
