# autoglyphs-renderer

A Javascript module to independently render the [Larva Labs Autoglyphs](https://www.larvalabs.com/autoglyphs).

## API

```javascript

import {asSVG} from 'autoglyphs-renderer';
const glyphstring = web3.tokenUri(...);
console.log(asSVG(glyhpstring, {size: 1000}));
```
