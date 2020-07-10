const fs = require('fs')
const chalk = require('chalk')

const readNote = (title) => {
    const notes = loadNotes();
    const note = notes.find((note) => note.title === title)

    if(note){
        console.log(chalk.blue.underline(title))
        console.log(note.body)
    }
    else{
        console.log(chalk.red.inverse('Note title not found'))
    }
}

const listNotes = () => {
    const notes = loadNotes()
    console.log(chalk.blue.underline('Yours notes'))
    notes.forEach(note => {
        console.log(note.title)
    });
}

const addNote = (title, body) => {
    const notes = loadNotes()
    const duplicateNote = notes.find((note) => note.title === title)

    if(!duplicateNote){
        notes.push({
            title: title,
            body: body
        })

        saveNotes(notes)
        console.log(chalk.green.inverse('New note added.'))    
    }
    else{
        console.log(chalk.red.inverse('Note title already taken'))
    }
}

const removeNote = (title) => {
    const notes = loadNotes();
    const remainingNotes = notes.filter((note) => note.title !== title)

    if(notes.length > remainingNotes.length){
        saveNotes(remainingNotes)
        console.log(chalk.green.inverse('Note removed!'))
    }
    else{
        console.log(chalk.red.inverse('No note found!'))
    }
}

const saveNotes = (notesArry) => {
    const dataJSON = JSON.stringify(notesArry)
    fs.writeFileSync('notes.json', dataJsON)
}

const loadNotes = () => {
    try{
        const dataBuffer = fs.readFileSync('notes.json')
        const dataJSON = dataBuffer.toString()
        return JSON.parse(dataJSON)
    } catch(e){
        return []
    }
}

module.exports = {
    addNote: addNote,
    removeNote: removeNote,
    listNotes: listNotes,
    readNote: readNote
}