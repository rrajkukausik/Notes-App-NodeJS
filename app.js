const fs = require('fs');
const _ = require('lodash');
const { demand } = require('yargs');
const yargs = require('yargs')

const notes = require('./notes.js');

const titleOptions = {
    describe: 'Title of note',
    demand: true,
    alias: 't'
};

const bodyOptions ={
    describe: 'body of the note',
    demand:true,
    alias: 'b'
};

const argv = yargs
    .command('add','Add a new note',{
        title: titleOptions,
        body:bodyOptions
    })
    .command('list','List all notes')
    .command('read','read a note',{
        title: titleOptions
    })
    .command('remove','Remove a note',{
        title: titleOptions
    })
    .help()
    .argv;
var command = argv._[0];
// console.log("Command : ", command);

if(command == 'add'){
   var note = notes.addNote(argv.title,argv.body);
   if (note){
        console.log('Note created');
        notes.logNote(note);
   }else{
        console.log('Note title taken');
   }
} else if (command == 'list') {
    var allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s).`);
    allNotes.forEach((note) => {
        notes.logNote(note);
    });
} else if (command == 'read') {
    var note = notes.getNote(argv.title);
    if (note){
        console.log('Note Found');
        notes.logNote(note);
    }else{
        console.log('Note not found !');
    }
} else if (command == 'remove'){
    var noteRemoved = notes.removeNote(argv.title);
    var message = noteRemoved ? 'Note was Removed' : 'Note Not found !';
    console.log(message);
}else {
    console.log("Command not recognized");
}
