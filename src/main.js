//imports
const axios = require('axios');
const cheerio = require('cheerio');

const ROOT_URL = `https://twist.moe`;
const SEARCH_REQ_PREFIX = `https://twist.moe`;

module.exports = {
    /**
     * Packages return values into an object
     * @param {(String | Error)} status 
     * @param {*} value 
     * @param {Array(*)} extra
     */
    ScraperData: function (status, value, extra) {
        return { status: status, value: value, ...extra };
    },
    /**
    * Returns all available title links
    * @param {AxiosConfig} opts
    */
    getAllTitles: async function (opts) {
        try {
            let req = await axios.get(`${SEARCH_REQ_PREFIX}`, opts);
            let $ = cheerio.load(req.data);
            let res = [];
            let status = 'Scraper Success!';

            $('a[class=series-title]').each(function (i, elem) {
                res.push({
                    name: $(this).children().first().text().replace(/["\n"]/g, "").trim(),
                    link: `${ROOT_URL}${$(this).attr('href').replace('/first', '')}`
                });
            });

            if (!res.length)
                status = new Error('Scraper Unsuccessful!');

            return this.ScraperData(status, res);
        } catch (err) {
            return err;
        }
    },

    /**
     * Returns the search results of a given keyword
     * @param keyword
     */
    getSearch: async function (keyword, opts) {
        keyword = keyword.toLowerCase();
        try {
            let req = await axios.get(`${SEARCH_REQ_PREFIX}`, opts);
            let $ = cheerio.load(req.data);
            let res;
            let status = "Scraper Success!";

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

            if (!res)
                status = new Error('Scraper Unsuccessful!');

            return this.ScraperData(status, res);
        } catch (err) {
            return err;
        }
    },
    /**
     * Returns all the episode links of the given keyword,
     */
    getEpisodes: async function (keyword) {
        try {
            let title = await getSearch(keyword);
            if (title) {
                return new Error("No title found!");
            }
        } catch (err) {
            return err;
        }
    }
}