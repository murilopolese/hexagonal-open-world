Template.board.onRendered(function() {
	// Update your session position
	this.autorun(function() {
		try {
			expect( Meteor.user().profile.position.x ).to.exist;
			expect( Meteor.user().profile.position.y ).to.exist;
			Session.set( 'yourPosition', Meteor.user().profile.position );
		} catch( e ) {}
	});
	// Update which land you are on session
	this.autorun(function() {
		try {
			expect( Meteor.user().profile.land.x ).to.exist;
			expect( Meteor.user().profile.land.y ).to.exist;
			Session.set( 'yourLandPosition', Meteor.user().profile.land );
			Meteor.subscribe( 'Lands' );
			Meteor.subscribe( 'Players' );
		} catch( e ) {}
	});

	// Get your current land and set session
	this.autorun(function() {
		try {
			var userLand = Session.get( 'yourLandPosition' );
			expect( userLand.x ).to.exist;
			expect( userLand.y ).to.exist;
			var currentLand = Lands.findOne({
				'position.x': parseInt( userLand.x ),
				'position.y': parseInt( userLand.y )
			});

			expect( currentLand ).to.exist;
			currentLand.tiles[ 5 ][ 9 ] = new Tile({
				type: 'portal',
				customClass: 'portal-east'
			});
			currentLand.tiles[ 5 ][ 0 ] = new Tile({
				type: 'portal',
				customClass: 'portal-west'
			});
			currentLand.tiles[ 0 ][ 5 ] = new Tile({
				type: 'portal',
				customClass: 'portal-north'
			});
			currentLand.tiles[ 9 ][ 5 ] = new Tile({
				type: 'portal',
				customClass: 'portal-south'
			});

			var yourPosition = Session.get( 'yourPosition' );
			expect( yourPosition.x ).to.exist;
			expect( yourPosition.y ).to.exist;
			expect( currentLand.tiles[ yourPosition.y ][ yourPosition.x ] ).to.exist;
			currentLand.tiles[ yourPosition.y ][ yourPosition.x ] = new Tile( 'you' );

			var otherPlayers = Session.get( 'otherPlayers' );
			expect( otherPlayers ).to.exist;
			otherPlayers.forEach( function( player ) {
				expect( player.profile.position.x ).to.exist;
				expect( player.profile.position.y ).to.exist;
				var playerPosition = player.profile.position;
				currentLand.tiles[ playerPosition.y ][ playerPosition.x ] = new Tile( 'player' );
			});


			Session.set( 'currentLand', currentLand );
		} catch( e ) {}
	});

	// Set other players on map
	this.autorun(function() {
		try {
			var otherPlayers = Session.get( 'otherPlayers' );
			var currentLand = Session.get( 'currentLand' );
			expect( currentLand ).to.exist;
			expect( otherPlayers ).to.exist;
			otherPlayers.forEach( function( player ) {
				expect( player.profile.position.x ).to.exist;
				expect( player.profile.position.y ).to.exist;
				var playerPosition = player.profile.position;
				currentLand.tiles[ playerPosition.y ][ playerPosition.x ] = new Tile( 'player' );
			});
			Session.set( 'currentLand', currentLand );
		} catch( e ) { console.log( 'autorun: current land tiles', e ) };
	});
	// Update other players
	this.autorun(function() {
		try {
			var userLand = Session.get( 'yourLandPosition' );
			expect( userLand ).to.exist;
			expect( Meteor.user() ).to.exist;
			expect( Meteor.users.find({}).count() ).to.be.above( 0 );

			Session.set( 'otherPlayers', Meteor.users.find({
				'_id': { $ne: Meteor.userId() },
				'profile.land.x': userLand.x,
				'profile.land.y': userLand.y
			}).fetch() );
		} catch( e ) {
			Session.set( 'otherPlayers', [] );
		}
	});
});

Template.board.helpers({
	land: function() {
		return Session.get( 'currentLand' );
	}
});

Template.board.events({
	'click .tile': function( e ) {
		try {
			expect( $( e.currentTarget ).data( 'x' ) ).to.exist;
			expect( $( e.currentTarget ).data( 'y' ) ).to.exist;
			var posClick = { 
				x: $( e.currentTarget ).data( 'x' ),
				y: $( e.currentTarget ).data( 'y' )
			};
			
			expect( Meteor.user().profile.position ).to.exist;
			if( tooFar( Meteor.user().profile.position, posClick ) ) {
				console.log( 'too far' );
				return false;
			}

			expect( Session.get( 'currentLand' ).tiles ).to.exist;
			if( !canStepInto( posClick, Session.get( 'currentLand' ).tiles ) ) {
				console.log( 'can not walk here' );
				return false;
			}

			Meteor.users.update(
				{ '_id': Meteor.userId() },
				{ $set: { 'profile.position': posClick } }
			);
		} catch( e ) {}
	},
	'click .portal': function( e ) {
		try {
			var currentLand = Session.get( 'currentLand' );
			var yourPosition = Session.get( 'yourPosition' );
			expect( currentLand ).to.exist;
			expect( yourPosition ).to.exist;

			var to = currentLand.position;
			if( $( e.currentTarget ).hasClass( 'portal-east' ) ) {
				to.x++;
				yourPosition.x = 0;
			}
			if( $( e.currentTarget ).hasClass( 'portal-west' ) ) {
				to.x--;
				yourPosition.x = currentLand.tiles[ 0 ].length - 1;
			}
			if( $( e.currentTarget ).hasClass( 'portal-north' ) ) {
				to.y++;
				yourPosition.y = currentLand.tiles.length - 1;
			}
			if( $( e.currentTarget ).hasClass( 'portal-south' ) ) {
				to.y--;
				yourPosition.y = 0;
			}

			expect( Meteor.user() );
			Meteor.users.update(
				{ '_id': Meteor.userId() },
				{ 
					$set: { 
						'profile.position.x': yourPosition.x || 0,
						'profile.position.y': yourPosition.y || 0,
						'profile.land.x': to.x || 0,
						'profile.land.y': to.y || 0
					}
				},
				function() {
					Meteor.subscribe( 'Lands' );
					Meteor.subscribe( 'Players' );
				}
			);
		} catch( e ) {};
	}
});