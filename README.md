holding
=========

>Holding a callback for some times

>[![NPM Version][npm-image]][npm-url]
>[![Download Status][download-image]][npm-url]
>[![Dependencies][david-image]][david-url]

## Installation

```bash
$ npm install holding
```

## API

```js
var holding = require('holding');
var done = holding(3, done, this);

done.times;
done.executed;
done.immediate();
```

#### holding(n, fn, context)
- ```n``` - ```Number```

  already holding times

- ```fn``` - ```Function```

  holding callback

- ```context``` - ```*```

  fn context

#### holding(n, fn, context).times
- the holding already executed times

#### holding(n, fn, context).executed
- fn  is already executed

#### holding(n, fn, context).immediate
- execute fn immediate if it isn't executed

## License

[MIT](LICENSE)

[david-image]: http://img.shields.io/david/nuintun/holding.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/holding
[npm-image]: http://img.shields.io/npm/v/holding.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/holding
[download-image]: http://img.shields.io/npm/dm/holding.svg?style=flat-square
