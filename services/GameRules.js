distance = function( from, to ) {
	dx = Math.abs( from.x - to.x );
	dy = Math.abs( from.y - to.y );
	return { dx: dx, dy: dy, d: 0 };
};

tooFar = function( from, to ) {
	return distance( from, to ).dx > 1 || distance( from, to ).dy > 1;
}

var walkableTiles = [ 'field', 'portal' ];
canStepInto = function( position, tiles ) {
	tiles = tiles || [];
	if( tiles[ position.y ] 
		&& tiles[ position.y ][ position.x ]
		&& tiles[ position.y ][ position.x ].type
		&& walkableTiles.indexOf( tiles[ position.y ][ position.x ].type ) != -1
	) {
		return true;
	}
	return false;
}