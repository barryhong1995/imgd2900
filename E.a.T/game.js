// game.js for Perlenspiel 3.2

/*
Perlenspiel is a scheme by Professor Moriarty (bmoriarty@wpi.edu).
Perlenspiel is Copyright © 2009-15 Worcester Polytechnic Institute.
This file is part of Perlenspiel.

Perlenspiel is free software: you can redistribute it and/or modify
it under the terms of the GNU Lesser General Public License as published
by the Free Software Foundation, either version 3 of the License, or
(at your option) any later version.

Perlenspiel is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Lesser General Public License for more details.

You may have received a copy of the GNU Lesser General Public License
along with Perlenspiel. If not, see <http://www.gnu.org/licenses/>.

Perlenspiel uses dygraphs (Copyright © 2009 by Dan Vanderkam) under the MIT License for data visualization.
See dygraphs License.txt, <http://dygraphs.com> and <http://opensource.org/licenses/MIT> for more information.
*/

// The following comment lines are for JSLint. Don't remove them!

/*jslint nomen: true, white: true */
/*global PS */

// This is a template for creating new Perlenspiel games

// All of the functions below MUST exist, or the engine will complain!

// PS.init( system, options )
// Initializes the game
// This function should normally begin with a call to PS.gridSize( x, y )
// where x and y are the desired initial dimensions of the grid
// [system] = an object containing engine and platform information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

// Object: Alien Pet
var pet;

( function () {
	pet = {
		width : 31, // width of grid
		height : 31, // height of grid

		// The following variables are all
		// grabber-related, so they start with 'grab'

		grabX : [ 12, 18, 13, 14, 15, 16, 17, 13, 15, 17, 12, 13, 14, 15, 16, 17, 18, 12, 18 ], // x-position
		grabY : [ 14, 14, 15, 15, 15, 15, 15, 16, 16, 16, 17, 17, 17, 17 ,17, 17, 17, 18, 18 ], // y-position
		
		grabColor : PS.COLOR_RED, // color

		// The following variables are all
		// wall-related, so they start with 'wall'

		wallColor : PS.COLOR_BLACK,

		// move( x, y )
		// Attempts to move grabber relative to
		// current position

		move : function ( x, y ) {
			var nx, ny, i;

			// Calculate proposed new position
			
			for ( i = 0; i < 19; i+=1 ) {
				nx = pet.grabX[i] + x;
				ny = pet.grabY[i] + y;

				// Is new location off the grid?
				// If so, return without moving

				if ( ( nx < 0 ) || ( nx >= pet.width ) || ( ny < 0 ) || ( ny >= pet.height ) ) {
					return;
				}

				// Is there a wall in that location?
				// If the bead there is black, it's a wall,
				// so return without moving

				if ( PS.color( nx, ny ) === pet.wallColor ) {
					return;
				}

				// Legal move, so assign grabber's color
				// to new location
	
				PS.color ( nx, ny, pet.grabColor );

				// Change current location to floor color

				PS.color( pet.grabX[i], pet.grabY[i], PS.COLOR_WHITE );

				// Finally, update grabber's position vars

				pet.grabX[i] = nx;
				pet.grabY[i] = ny;
			}
		}
	};
}() );

PS.init = function( system, options ) {
	var i;
	"use strict";

	PS.gridSize( pet.width, pet.height ); // init grid
	PS.gridColor( 0x303030 ); // Perlenspiel gray
	PS.border( PS.ALL, PS.ALL, 0 ); // no borders
	
	PS.statusColor( PS.COLOR_WHITE );
	PS.statusText( "Happiness: 8%" );

	// Enclose edges of grid with black walls

	PS.color( PS.ALL, 0, pet.wallColor ); // top
	PS.color( PS.ALL, pet.height - 1, pet.wallColor ); // bottom
	PS.color( 0, PS.ALL, pet.wallColor ); // left
	PS.color( pet.width - 1, PS.ALL, pet.wallColor ); // right

	// Place player at initial position
	for ( i = 0; i < 19; i+=1 ) {
		PS.color( pet.grabX[i], pet.grabY[i], pet.grabColor );
	}
};

// Moving the grabber
PS.keyDown = function( key, shift, ctrl, options ) {
	"use strict";

	switch ( key ) {
		case PS.KEY_ARROW_UP:
		case 119: // lower-case w
		case 87: // upper-case W
		{
			pet.move( 0, -1 );
			break;
		}
		case PS.KEY_ARROW_DOWN:
		case 115: // lower-case s
		case 83: // upper-case S
		{
			pet.move( 0, 1 );
			break;
		}
		case PS.KEY_ARROW_LEFT:
		case 97: // lower-case a
		case 65: // upper-case A
		{
			pet.move( -1, 0 );
			break;
		}
		case PS.KEY_ARROW_RIGHT:
		case 100: // lower-case d
		case 68: // upper-case D
		{
			pet.move( 1, 0 );
			break;
		}
	}
};

// PS.touch ( x, y, data, options )
// Called when the mouse button is clicked on a bead, or when a bead is touched
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.touch = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.touch() @ " + x + ", " + y + "\n" );

	// Add code here for mouse clicks/touches over a bead
	PS.color ( x, y, PS.COLOR_ORANGE );
	
	PS.audioPlay( "fx_click" );
};

// PS.release ( x, y, data, options )
// Called when the mouse button is released over a bead, or when a touch is lifted off a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.release = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.release() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse button/touch is released over a bead
};

// PS.enter ( x, y, button, data, options )
// Called when the mouse/touch enters a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.enter = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.enter() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch enters a bead
};

// PS.exit ( x, y, data, options )
// Called when the mouse cursor/touch exits a bead
// It doesn't have to do anything
// [x] = zero-based x-position of the bead on the grid
// [y] = zero-based y-position of the bead on the grid
// [data] = the data value associated with this bead, 0 if none has been set
// [options] = an object with optional parameters; see documentation for details

PS.exit = function( x, y, data, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.exit() @ " + x + ", " + y + "\n" );

	// Add code here for when the mouse cursor/touch exits a bead
};

// PS.exitGrid ( options )
// Called when the mouse cursor/touch exits the grid perimeter
// It doesn't have to do anything
// [options] = an object with optional parameters; see documentation for details

PS.exitGrid = function( options ) {
	"use strict";

	// Uncomment the following line to verify operation
	// PS.debug( "PS.exitGrid() called\n" );

	// Add code here for when the mouse cursor/touch moves off the grid
};

// PS.keyDown ( key, shift, ctrl, options )
// Called when a key on the keyboard is pressed
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F1
// [shift] = true if shift key is held down, else false
// [ctrl] = true if control key is held down, else false
// [options] = an object with optional parameters; see documentation for details

// PS.keyUp ( key, shift, ctrl, options )
// Called when a key on the keyboard is released
// It doesn't have to do anything
// [key] = ASCII code of the pressed key, or one of the following constants:
// Arrow keys = PS.ARROW_UP, PS.ARROW_DOWN, PS.ARROW_LEFT, PS.ARROW_RIGHT
// Function keys = PS.F1 through PS.F12
// [shift] = true if shift key is held down, false otherwise
// [ctrl] = true if control key is held down, false otherwise
// [options] = an object with optional parameters; see documentation for details

PS.keyUp = function( key, shift, ctrl, options ) {
	"use strict";

	// Uncomment the following line to inspect parameters
	// PS.debug( "PS.keyUp(): key = " + key + ", shift = " + shift + ", ctrl = " + ctrl + "\n" );

	// Add code here for when a key is released
};

// PS.swipe ( data, options )
// Called when a mouse/finger swipe across the grid is detected
// It doesn't have to do anything
// [data] = an object with swipe information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.swipe = function( data, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters

	/*
	 var len, i, ev;
	 PS.debugClear();
	 PS.debug( "PS.swipe(): start = " + data.start + ", end = " + data.end + ", dur = " + data.duration + "\n" );
	 len = data.events.length;
	 for ( i = 0; i < len; i += 1 ) {
	 ev = data.events[ i ];
	 PS.debug( i + ": [x = " + ev.x + ", y = " + ev.y + ", start = " + ev.start + ", end = " + ev.end +
	 ", dur = " + ev.duration + "]\n");
	 }
	 */

	// Add code here for when an input event is detected
};

// PS.input ( sensors, options )
// Called when an input device event (other than mouse/touch/keyboard) is detected
// It doesn't have to do anything
// [sensors] = an object with sensor information; see documentation for details
// [options] = an object with optional parameters; see documentation for details

PS.input = function( sensors, options ) {
	"use strict";

	// Uncomment the following block to inspect parameters
	/*
	PS.debug( "PS.input() called\n" );
	var device = sensors.wheel; // check for scroll wheel
	if ( device )
	{
		PS.debug( "sensors.wheel = " + device + "\n" );
	}
	*/
	
	// Add code here for when an input event is detected
};

