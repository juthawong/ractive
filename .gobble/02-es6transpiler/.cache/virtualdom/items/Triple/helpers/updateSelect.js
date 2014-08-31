define(['utils/toArray'],function (toArray) {

	'use strict';
	
	var __export;
	
	__export = function updateSelect ( parentElement ) {
		var selectedOptions, option, value;
	
		if ( !parentElement || parentElement.name !== 'select' || !parentElement.binding ) {
			return;
		}
	
		selectedOptions = toArray( parentElement.node.options ).filter( isSelected );
	
		// If one of them had a `selected` attribute, we need to sync
		// the model to the view
		if ( parentElement.getAttribute( 'multiple' ) ) {
			value = selectedOptions.map( function(o ) {return o.value} );
		} else if ( option = selectedOptions[0] ) {
			value = option.value;
		}
	
		if ( value !== undefined ) {
			parentElement.binding.setValue( value );
		}
	
		parentElement.bubble();
	};
	
	function isSelected ( option ) {
		return option.selected;
	}
	return __export;

});