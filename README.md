# holding

> Holding a callback for some times
>
> [![NPM Version][npm-image]][npm-url]
> [![Download Status][download-image]][npm-url]
> [![Dependencies][david-image]][david-url]

## Installation

```bash
$ npm install holding
```

## API

```js
const holding = require('holding');
const done = holding(2, function() {
  console.log(this, 'called');
}, this);

done();
done();
done(); // it works

done.times; // show called times
done.called; // show fn call status
```

#### holding(n, fn, context)

* `n` - `{Number}`

  holding times, it will execute fn after n times.

* `fn` - `{Function}`

  holding callback.

* `context` - `{Any}`

  fn context.

#### holding(n, fn, context).times

* show called times.

#### holding(n, fn, context).called

* show fn call status.

#### holding.assert(n, fn, context)

* function for assertion testing, will throw error if call times out of range.

## License

[MIT](LICENSE)

[david-image]: http://img.shields.io/david/nuintun/holding.svg?style=flat-square
[david-url]: https://david-dm.org/nuintun/holding
[npm-image]: http://img.shields.io/npm/v/holding.svg?style=flat-square
[npm-url]: https://www.npmjs.org/package/holding
[download-image]: http://img.shields.io/npm/dm/holding.svg?style=flat-square
