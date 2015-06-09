Meteor.subscribe( 'Lands' );
Meteor.subscribe( 'Players' );

UI.registerHelper( 'addIndex', function( arr ) {
	arr = arr || [];
	return arr.map( function( el, i ) {
		return { index: i, value: el };
	})
});