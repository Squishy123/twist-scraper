const {assert, expect} = require('chai');
const chai = require('chai');

chai.use(require('chai-like'));
chai.use(require('chai-things'));

const scraper = require('../src/main.js');

describe(`getAllTitles() Tests`, () => {
    it('default', async function ()  {
        try {
            let res = await scraper.getAllTitles();
            console.log(res);
            return expect(res.value).to.be.not.empty;
        } catch(err) {
            return assert.fail(err);
        }
    });
    it('check for opm', async function ()  {
        try {
            let res = await scraper.getAllTitles();
            console.log(res);
            let opm = res.value.find((title) => {
                return (title.name === 'One Punch Man')
            });
            console.log(opm);
            return expect(opm).to.be.an('object').that.is.like({name: "One Punch Man"});
        } catch(err) {
            return assert.fail(err)
        }
    });
});