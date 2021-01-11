#!/usr/bin/env node

// https://stackoverflow.com/questions/5006821/nodejs-how-to-read-keystrokes-from-stdin

const spawn = require('child_process').spawn;

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }
  // write the key to stdout all normal like
  process.stdout.write( key );
  // haha, yes no it's not normal, it's this:
  spawn("xdotool", ["key", key]);

});



