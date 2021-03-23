// console.log("starting notes.js");
const fs = require('fs');

var fetchnotes = () => {
    try {
        var notesString = fs.readFileSync('notes-data.json');
        return JSON.parse(notesString);
    } catch(e){
        return [];
    }
};

var saveNotes = (notes) => {
    fs.writeFileSync('notes-data.json',JSON.stringify(notes));
};

var addNote = (title, body) => {
var notes = fetchnotes();
var note = {
    title,
    body
};

var duplicateNotes = notes.filter((note) => note.title === title);


if (duplicateNotes.length === 0){
    notes.push(note);
    saveNotes(notes);
    return note;
}
}

var getAll = () => {
    return fetchnotes();
}
var getNote = (title) => {
    var notes = fetchnotes();
    var filteredNotes = notes.filter((note)=>{
        return note.title === title;
    });
    return filteredNotes[0];
}
var removeNote = (title) => {
    var notes = fetchnotes();
    var filteredNotes = notes.filter((note) => note.title !== title);
    saveNotes(filteredNotes);

    return notes.length !== filteredNotes.length;
}
var logNote = (note) => {
    // debugger;
    console.log('------');
    console.log(`title: ${note.title}`);
    console.log(`body: ${note.body}`);
}
module.exports = {
    addNote,
    getAll,
    getNote,
    removeNote,
    logNote
}