const chai = require('chai'),
expect = chai.expect;


chai.use(require('chai-like'));
chai.use(require('chai-things'));

const scraper = require('../src/main.js');

describe(`getAllTitles() Tests`, () => {
    it('default', async function ()  {
        try {
            let res = await scraper.getAllTitles();
            console.log(res);
            return expect(res).to.be.an('array').to.have.length.gt(0);
        } catch(err) {
            return err;
        }
    });
    it('check for opm', async function ()  {
        try {
            let res = await scraper.getAllTitles();
            let opm = res.find((title) => {
                return (title.name === 'One Punch Man')
            });
            console.log(opm);
            return expect(opm).to.be.an('object').that.equals.something.like({name: "One Punch Man"});
        } catch(err) {
            return err;
        }
    });
});