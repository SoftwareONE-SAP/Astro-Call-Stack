/**
 * Activity   - Commented out no callstack error.
 * Resolve
 * mediaLink
 * AS.Object - inherits resolvable
 */

/**
 * Declare the AS exportable symbol
 * @type {Object}
 */
AS = {};

/**
 * Namespace for storing verbs
 */
AS.VERBS = {};

/**
 * Resolvable Objects
 */
AS.Resolvable = Astro.Class.create({
	name: 'AS.Resolvable',
	validators: {
		id: [
			{type: 'required'}
		]
	},
	methods: {
		resolve: function() {
			console.warn("Unable to resolve document, no resolver method specified!");
			return this;
		}
	}
});

// AS.Object = Astro.Class.create({
AS.Object = AS.Resolvable.inherit({
	name: 'AS.Object',
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