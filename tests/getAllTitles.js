const { expect } = require('chai');

const scraper = require('../src/main.js');

describe(`getAllTitles() Tests`, () => {
    it('default', async function ()  {
        try {
            let res = await scraper.getAllTitles();
            console.log(res);
            return expect(res.length).to.be.gt(0);
        } catch(err) {
            return err;
        }
    });
});