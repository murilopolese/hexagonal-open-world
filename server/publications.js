Meteor.publish( 'Lands', function() {
	try {
		expect( this.userId ).to.exist;
		var user = Meteor.users.findOne( { _id: this.userId } );
		expect( user.profile.land.x ).to.exist;
		expect( user.profile.land.y ).to.exist;
		var lands = Lands.find({
			'position.x': parseInt( user.profile.land.x ),
			'position.y': parseInt( user.profile.land.y )
		});
		if( lands.count() == 0 ) {
			console.log( 'generate land' );
			Lands.insert(
				new Land({
					name: generateName(),
					position: { x: user.profile.land.x, y: user.profile.land.y },
					tiles: generateTerrain( 10, 10 )
				})
			);
		}
		return lands;

	} catch( e ) {};
	this.ready();
});

Meteor.publish( 'Players', function() {
	try {
		expect( this.userId ).to.exist;
		return Meteor.users.find({ 
			_id: { $ne: this.userId }
		});
	} catch( e ) {
		this.ready();
	}
});