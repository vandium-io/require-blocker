'use strict';

const Module = require( 'module' );

const originalRequire = Module.prototype.require;

var modulesToHide = [];

function blockRequire( path ) {

    if( modulesToHide.indexOf( path ) > -1 ) {

        throw new Error( 'Cannot find module ' + path );
    }

    return originalRequire.call( this, path );
}


function block() {

    for( let moduleName of arguments ) {

        modulesToHide.push( moduleName );
    }

    Module.prototype.require = blockRequire;
}

function reset() {

    modulesToHide = [];
    Module.prototype.require = originalRequire;
}

module.exports = {

    block,
    reset
};
