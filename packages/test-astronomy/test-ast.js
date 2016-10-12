/**
 * Activity   - Commented out no callstack error.
 * AS.Object - inherits resolvable
 */

AS = {};

AS.Object = Astro.Class.create({
	name:      'AS.Object',
	typeField: 'objectType',
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
	typeField: 'objectType',
	collection: new Meteor.Collection('as.activities'),
	fields: {
		fieldA: {
			type: AS.Object,
		},
	},
});