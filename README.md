# Dinner Menu
A very simple API for the [Dinner Menu](https://github.com/xiprox/Dinner-Menu) app written in [Node.js](https://nodejs.org/en) using the [Express](http://expressjs.com/) framework.

## Endpoints

#### Get menu by date
```
/get?month={month}&year={year}
```
**Type:** GET

**Parameters:**
- month (Integer, 1-12)
- year (Integer)

#### Upload monthly menu
```
/upload
```
**Type:** POST

**Body:**
- username (String): Defined in [config.js](/config.js).
- password (String): Defined in [config.js](/config.js).
- month (Integer, 1-12)
- year (Integer)
- menu (String): Needs to be in JSON format. See [example](/data/menus/example.json).

## License
GPL v3 (See [LICENSE](/LICENSE))
