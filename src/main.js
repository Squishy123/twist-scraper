//imports
const axios = require('axios');
const cheerio = require('cheerio');

const SEARCH_REQ_PREFIX = `https://twist.moe`;

module.exports = {
    /**
    * Returns all available title links
    * @param {AxiosConfig} opts
    */
    getAllTitles: async function (opts) {
        try {
            let req = await axios.get(`${SEARCH_REQ_PREFIX}`, opts);
            let $ = cheerio.load(req);
            let titles = [];

            $(`a.series-title`).each(function (i, elem) {
                titles.push({
                    name: $(this).children().first().text(),
                    link: $(this).attr('href')
                })
            });
            return titles;
        } catch (err) {
            return err;
        }
    },

    /**
     * Returns the search results of a given keyword
     * @param keyword
     */
    getSearch: async function (keyword, opts) {
        try {
            let req = await axios.get(`${SEARCH_REQ_PREFIX}`, opts);
            let $ = cheerio.load(req);
            let res;

            $(`a.series-title`).each(function (i, elem) {
                //alpha break
                if($(this).children().first().text() > keyword) 
                    return false;

                if ($(this).children().first().text() === keyword) {
                    res = {
                        name: $(this).children().first().text(),
                        link: $(this).attr('href')
                    }

                    return false;
                }
            });
            return res;
        } catch (err) {
            return err;
        }
    }
}