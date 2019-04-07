//imports
const axios = require('axios');
const cheerio = require('cheerio');

const ROOT_URL = `https://twist.moe`;
const SEARCH_REQ_PREFIX = `https://twist.moe`;

module.exports = {
    /**
    * Returns all available title links
    * @param {AxiosConfig} opts
    */
    getAllTitles: async function (opts) {
        try {
            let req = await axios.get(`${SEARCH_REQ_PREFIX}`, opts);
            let $ = cheerio.load(req.data);
            let res = [];

            $('a[class=series-title]').each(function (i, elem) {
                res.push({
                    name: $(this).children().first().text().replace(/["\n"]/g, "").trim(),
                    link: `${ROOT_URL}${$(this).attr('href').replace('/first', '')}`
                });
            });
            return res;
        } catch (err) {
            return err;
        }
    },

    /**
     * Returns the search results of a given keyword
     * @param keyword
     */
    getSearch: async function (keyword, opts) {
        keyword=keyword.toLowerCase();
        try {
            let req = await axios.get(`${SEARCH_REQ_PREFIX}`, opts);
            let $ = cheerio.load(req.data);
            let res;

            $('a[class=series-title]').each(function (i, elem) {
                let title = $(this).children().first().text().replace(/["\n"]/g, "").trim().toLowerCase();
                
                if (title === keyword) {
                    res = {
                        name: title,
                        link: `${ROOT_URL}${$(this).attr('href').replace('/first', '')}`
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