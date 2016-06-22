[![Build Status](https://travis-ci.org/vandium-io/require-blocker.svg?branch=master)](https://travis-ci.org/vandium-io/require-blocker)
[![npm version](https://badge.fury.io/js/require-blocker.svg)](https://badge.fury.io/js/require-blocker)

# Require Blocker

Prevents modules from being loaded when running unit tests.

## Features

* Hide multiple modules
* Will fail the same way that `require()` does when a module cannot be found
* No dependencies

## Installation

Install via npm.

	npm install require-blocker --save-dev


## Getting Started

```js
'use strict';

const requireBlocker = require( 'require-blocker' );


requireBlocker.block( 'http', 'https' );

// require( 'http' ); will fail
// require( 'https' ); will fail

requireBlocker.reset();

// require( 'http' ); will load
// require( 'https' ); will load
```

## Feedback

We'd love to get feedback on how to make this tool better. Feel free to contact us at `feedback@vandium.io`


## License

[BSD-3-Clause](https://en.wikipedia.org/wiki/BSD_licenses)
