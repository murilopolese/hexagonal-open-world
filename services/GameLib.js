Tile = function( opts ) {
	if( typeof opts == 'string' ) {
		this.type = opts;
	} else {
		opts = opts || {};
		this.type = opts.type || 'void';
		this.customClass = opts.customClass || '';
	}
};

Land = function( opts ) {
	opts = opts || {};
	this.name = opts.name || generateName();
	this.position = opts.position || { x: 0, y: 0 };
	this.tiles = opts.tiles || [[]];
}

generateName = function() {
	this.adjs = [
		'Autumn', 'Hidden', 'Bitter', 'Misty', 'Silent', 'Empty', 'Dry', 'Dark',
		'Summer', 'Icy', 'Delicate', 'Quiet', 'White', 'Cool', 'Spring', 'Winter',
		'Patient', 'Twilight', 'Dawn', 'Crimson', 'Wispy', 'Weathered', 'Blue',
		'Billowing', 'Broken', 'Cold', 'Damp', 'Falling', 'Frosty', 'Green',
		'Long', 'Late', 'Lingering', 'Bold', 'Little', 'Morning', 'Muddy', 'Old',
		'Red', 'Rough', 'Still', 'Small', 'Sparkling', 'Throbbing', 'Shy',
		'Wandering', 'Withered', 'Wild', 'Black', 'Young', 'Holy', 'Solitary',
		'Fragrant', 'Aged', 'Snowy', 'Proud', 'Floral', 'Restless', 'Divine',
		'Polished', 'Ancient', 'Purple', 'Lively', 'Nameless',
		'Cocky','Big','Small','Funky','Cute','Smart','Lovely','Awesome','Amazing',
		'Gracious','Fabulous','Outstanding','Incredible','Sweet',
	];
	this.nouns = [
		'Waterfall', 'River', 'Breeze', 'Moon', 'Rain', 'Wind', 'Sea', 'Morning',
		'Snow', 'Lake', 'Sunset', 'Pine', 'Shadow', 'Leaf', 'Dawn', 'Glitter',
		'Forest', 'Hill', 'Cloud', 'Meadow', 'Sun', 'Glade', 'Bird', 'Brook',
		'Butterfly', 'Bush', 'Dew', 'Dust', 'Field', 'Fire', 'Flower', 'Firefly',
		'Feather', 'Grass', 'Haze', 'Mountain', 'Night', 'Pond', 'Darkness',
		'Snowflake', 'Silence', 'Sound', 'Sky', 'Shape', 'Surf', 'Thunder',
		'Violet', 'Water', 'Wildflower', 'Wave', 'Water', 'Resonance', 'Sun',
		'Wood', 'Dream', 'Cherry', 'Tree', 'Fog', 'Frost', 'Voice', 'Paper',
		'Frog', 'Smoke', 'Star'
	];
	this.rnd =  function() {
		return Math.floor( Math.random() * Math.pow( 2,12 ) );
	}
	
	return this.adjs[ this.rnd() % 64 ] + ' ' + this.nouns[ this.rnd() % 64 ];
};

generateTerrain = function( width, height ) {
	var tiles = [];
	var scale = Math.random() * ( Math.random() * 5 );
	var simplex = new SimplexNoise();
	for( var i = 0; i < height; i++ ) {
		tiles[ i ] = [];
		for( var j = 0; j < width; j++ ) {
			var x = parseInt( j / scale );
			var y = parseInt( i / scale );
			var noise = simplex.noise2D( x, y ) + 1;
			if( noise > 1.5 ) {
				tiles[ i ].push( new Tile( 'mountain' ) );
			} else if( noise > 0.7 ) {
				tiles[ i ].push( new Tile( 'field' ) );
			} else {
				tiles[ i ].push( new Tile( 'water' ) );
			}
		}
	}
	return tiles;
}


