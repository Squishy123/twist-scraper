const chai = require('chai'),
expect = chai.expect;


chai.use(require('chai-like'));
chai.use(require('chai-things'));

const scraper = require('../src/main.js');

describe(`getSearch() Tests`, () => {
    it('search for opm', async function ()  {
        try {
            let res = await scraper.getSearch('One Punch Man');
            console.log(res);
            return expect(res).to.be.an('object').that.equals.something.like({name: "One Punch Man"});
        } catch(err) {
            return err;
        }
    });
    it('search for nge', async function ()  {
        try {
            let res = await scraper.getSearch('shinseiki evangelion');
            console.log(res);
            return expect(res).to.be.an('object').that.equals.something.like({name: "shinseiki evangelion"});
        } catch(err) {
            return err;
        }
    });
    it('search for invalid', async function ()  {
        try {
            let res = await scraper.getSearch('thisdoesnotexist');
            console.log(res);
            return expect(res).to.be.null;
        } catch(err) {
            return err;
        }
    });
});