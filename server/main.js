Meteor.startup( function() {
	Lands.remove({});
	Lands.insert(
		new Land({
			name: generateName(),
			position: { x: 0, y: 0 },
			tiles: generateTerrain( 10, 10 )
		})
	);
});

Accounts.onCreateUser(function(	options, user ) {
	
	options.profile = options.profile || {};
	options.profile.land = { x: 0, y: 0 };
	options.profile.position = { x: 0, y: 0 };
	options.profile.name = generateName();
	options.profile.skin = 'red';

	user.profile = options.profile;
	return user;
});