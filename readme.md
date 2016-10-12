# Astro-Call-Stack

A simple test case to reproduce the call stack error.

```
W20161012-15:49:43.074(1)? (STDERR) /home/jlacey/.meteor/packages/meteor-tool/.1.3.5_1.1bjykex++os.linux.x86_64+web.browser+web.cordova/mt-os.linux.x86_64/dev_bundle/server-lib/node_modules/fibers/future.js:280
W20161012-15:49:43.074(1)? (STDERR) 						throw(ex);
W20161012-15:49:43.074(1)? (STDERR) 						      ^
W20161012-15:49:43.074(1)? (STDERR) RangeError: Maximum call stack size exceeded
```

The bug inducing code can be found at `packages/test-astronomy/test-ast.js`

Doesn't work
``` javascript
api.use(  'jagi:astronomy@=2.1.4');
api.imply('jagi:astronomy@=2.1.4');
```

Works
``` javascript
api.use(  'jagi:astronomy@=2.1.0');
api.imply('jagi:astronomy@=2.1.0');
```

To downgrade remove the `test-astronomy` and readd it.