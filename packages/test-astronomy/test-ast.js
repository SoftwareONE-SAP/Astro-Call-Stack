/**
 *
 * This set of model definitions will cause this error.
 *
 * W20161012-15:49:43.074(1)? (STDERR) /home/jlacey/.meteor/packages/meteor-tool/.1.3.5_1.1bjykex++os.linux.x86_64+web.browser+web.cordova/mt-os.linux.x86_64/dev_bundle/server-lib/node_modules/fibers/future.js:280
 * W20161012-15:49:43.074(1)? (STDERR) 						throw(ex);
 * W20161012-15:49:43.074(1)? (STDERR) 						      ^
 * W20161012-15:49:43.074(1)? (STDERR) RangeError: Maximum call stack size exceeded
 *
 */
AS = {};

AS.Object = Astro.Class.create({
	name:      'AS.Object',
});

AS.Object.extend({
	fields: {
    /**
     * @NOTE
     * Commenting out these lines, will not cause a call stack error
     */
		attachments: {
			type: [AS.Object],
			optional: true
		},
		author: {
			type: AS.Object,
			optional: true
		},
	},
});

/**
 * @NOTE
 * Commenting the activity class, will not cause a call stack error.
 */
AS.Activity = Astro.Class.create({
	name:      'AS.Activity',
  /**
   * @NOTE
   * Commenting the collection will stop the call stack error.
   */
	collection: new Meteor.Collection('as.activities'),
	fields: {
		fieldA: {
			type: AS.Object,
		},
	},
});