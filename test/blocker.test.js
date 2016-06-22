'use strict';

const expect = require( 'chai' ).expect;

const Module = require( 'module' );

const originalRequire = Module.prototype.require;

const blocker = require( '../lib/blocker' );

describe( 'lib/blocker', function() {

    describe( '.block', function() {

        afterEach( function() {

            blocker.reset();
        });

        it( 'single module', function() {

            // should work
            require( 'http' );

            blocker.block( 'http' );

            expect( require.bind( require, 'http') ).to.throw( 'Cannot find module http' );
        });

        it( 'multiple modules', function() {

            // should work
            require( 'http' );
            require( 'https' );

            blocker.block( 'http', 'https' );

            expect( require.bind( require, 'http') ).to.throw( 'Cannot find module http' );
            expect( require.bind( require, 'https') ).to.throw( 'Cannot find module https' );

            // should work on other modules
            require( 'fs' );
        });

        it( 'multiple modules, added using different statements', function() {

            // should work
            require( 'http' );
            require( 'https' );

            blocker.block( 'http' );
            blocker.block( 'https' );

            expect( require.bind( require, 'http') ).to.throw( 'Cannot find module http' );
            expect( require.bind( require, 'https') ).to.throw( 'Cannot find module https' );

            // should work on other modules
            require( 'fs' );
        });
    });

    describe( '.reset', function() {

        it( 'normal operation', function() {

            // should work
            require( 'http' );

            blocker.block( 'http' );

            expect( originalRequire ).to.not.equal( Module.prototype.require );

            expect( require.bind( require, 'http') ).to.throw( 'Cannot find module http' );

            blocker.reset();

            expect( originalRequire ).to.equal( Module.prototype.require );

            // should work
            require( 'http' );
        });
    });
});
