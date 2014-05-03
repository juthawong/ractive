define( function () {

	'use strict';

	return function clearCache ( ractive, keypath, dontTeardownWrapper ) {
		var cacheMap, wrapper, computation;

		if ( !dontTeardownWrapper ) {
			// Is there a wrapped property at this keypath?
			if ( wrapper = ractive._wrapped[ keypath ] ) {
				// Did we unwrap it?
				if ( wrapper.teardown() !== false ) {
					ractive._wrapped[ keypath ] = null;
				}
			}
		}

		if ( computation = ractive._computations[ keypath ] ) {
			computation.compute();
		}

		ractive._cache[ keypath ] = undefined;

		if ( cacheMap = ractive._cacheMap[ keypath ] ) {
			while ( cacheMap.length ) {
				clearCache( ractive, cacheMap.pop() );
			}
		}
	};

});