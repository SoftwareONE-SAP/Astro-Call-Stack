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

AS.MediaLink = Astro.Class.create({
	name: 'AS.MediaLink',
	typeField: 'objectType',
	fields: {
		url: {
			type: String,
		},
		duration: {
			type: Number,
			optional: true
		},
		height: {
			type: Number,
			optional: true
		},
		width: {
			type: Number,
			optional: true
		}
	}
});

AS.Object = AS.Resolvable.inherit({
	name: 'AS.Object',
	typeField: 'objectType',
	behaviors: {
		timestamp: {
			hasCreatedField: 	true,
			hasUpdatedField: 	true,
			createdFieldName: 	'published',
			updatedFieldName: 	'updated'
		}
	}
});

AS.Object.extend({
	fields: {
		objectType: {
			type: String,
		},
		attachments: {
			type: [AS.Object],
			optional: true
		},
		author: {
			type: AS.Object,
			optional: true
		},
		content: {
			type: String,
			optional: true
		},
		displayName: {
			type: String,
			optional: true
		},
		downstreamDuplicates: {
			type: [String],
			optional: true
		},
		upstreamDuplicates: {
			type: [String],
			optional: true
		},
		id: {
			type: String,
		},
		image: {
			type: AS.MediaLink,
			optional: true
		},
		published: {
			type: Date,
			immutable: true,
			default: function() { return new Date(); },
		},
		summary: {
			type: String,
			optional: true
		},
		updated: {
			type: Date,
			default: function() { return new Date(); },
		},
		url: {
			type: String,
			optional: true
		},
		parentType: {
			type: String,
			transient: true,
			immutable: true,
			default: null,
		},
	},
	events: {
		afterInit(e) {
			e.currentTarget.parentType = e.currentTarget.constructor.getParent().getName();
		}
	}
});

AS.Activity = Astro.Class.create({
	name: 'AS.Activity',
	typeField: 'objectType',
	collection: new Meteor.Collection('as.activities'),
	fields: {
		actor: {
			type: AS.Object,
		},
		object: {
			type: AS.Object,
		},
		verb: {
			type: String,
			index: 1,
		},
		published: {
			type: Date,
			immutable: true,
			default: function() { return new Date(); },
		},
		content: {
			type: String,
			optional: true
		},
		generator: {
			type: AS.Object,
			optional: true
		},
		icon: {
			type: AS.MediaLink,
			optional: true
		},
		id: {
			type: String,
			transient: true,
			immutable: true,
		},
		provider: {
			type: AS.Object,
			optional: true
		},
		target: {
			type: AS.Object,
			optional: true
		},
		title: {
			type: String,
			optional: true
		},
		updated: {
			type: Date,
			default: function() { return new Date(); },
			index: 1,
		},
		url: {
			type: String,
			optional: true
		}
	},
	behaviors: {
		timestamp: {
			hasCreatedField: 	true,
			hasUpdatedField: 	true,
			createdFieldName:	'published',
			updatedFieldName: 	'updated'
		}
	},
	indexes: {
		Org_ObjectType_Created: {
			fields: {
				'created':           1,
				'object.objectType': 1,
			}
		},
	},
	events: {
		afterInit: function (e) {
			e.target.set("id", e.target._id);
		},
		beforeSave: function(e) {
			try {
				e.target.validate({ stopOnFirstError: false });
			} catch (err) {
				if (err.error === 'validation-error') {
					err = new Meteor.Error(err.error, [].concat(err.details).map(e => e.message));
				}
				e.preventDefault();
				throw err;
			}
		},
		afterSave: function(e){
			e.target.set("id", this._id);
		}
	}
});