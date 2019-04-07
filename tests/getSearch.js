const {assert, expect} = require('chai');
const chai = require('chai');

chai.use(require('chai-like'));
chai.use(require('chai-things'));

const scraper = require('../src/main.js');

describe(`getSearch() Tests`, () => {
    it('search for opm', async function ()  {
        try {
            let res = await scraper.getSearch('one punch man');
            console.log(res);
            return expect(res.value).to.be.an('object').that.is.like({name: "one punch man"});
        } catch(err) {
            return assert.fail(err);
        }
    });
    it('search for nge', async function ()  {
        try {
            let res = await scraper.getSearch('shinseiki evangelion');
            console.log(res);
            return expect(res.value).to.be.an('object').that.is.like({name: "shinseiki evangelion"});
        } catch(err) {
            return assert.fail(err);
        }
    });
    it('search for invalid', async function ()  {
        try {
            let res = await scraper.getSearch('thisdoesnotexist');
            console.log(res);
            return expect(res.value).to.not.exist;
        } catch(err) {
            return assert.fail(err);
        }
    });
});