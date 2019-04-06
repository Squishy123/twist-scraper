# twist-scraper
Scraper for twist.moe

### Features
* Scrape Search Results
* Get anime metadata
* Get sources for a given episode

### Install
```
npm install twist-scraper --save
```
or 
```
yarn add twist-scraper
```

### How To Use 

Use the scraper to get a list of search results based on a keyword query
```javascript
const scraper = require('twist-scraper');

(async() => {
    let result = await scraper.getSearch(query, options);
    console.log(result)
})();

```

Use the scraper to get anime metadata
```javascript
const scraper = require('twist-scraper');

(async() => {
    let sources = await getSearch(animeID, options);
    console.log(src)
})();

```

Use the scraper to get a list of episode sources
```javascript
const scraper = require('twist-scraper');

(async() => {
    let sources = await getSearch(slug, episodeNumber, options);
    console.log(src)
})();

```
### License
AGPL-3.0