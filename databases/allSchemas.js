import Realm from "realm";

export const NOTELIST_SCHEMA = "NoteList";
export const NOTE_SCHEMA = "Note";

export const NoteSchema = {
  name: NOTE_SCHEMA,
  primaryKey: "id",
  properties: {
    id: "int",
    title: { type: "string", indexed: true },
    description: { type: "string", indexed: true },
    date: "date"
  }
};

export const NoteListSchema = {
  name: NOTELIST_SCHEMA,
  primaryKey: "id",
  properties: {
    id: "int",
    title: "string",
    description: "string",
    date: "date",
    notes: { type: "list", objectType: NOTE_SCHEMA }
  }
};
const databaseOptions = {
  path: "noteListApp.realm",
  schema: [NoteListSchema, NoteSchema],
  schemaVersion: 1
};

export const insertNewNote = newNote =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          realm.create(NOTELIST_SCHEMA, newNote);
          resolve(newNote);
        });
      })
      .catch(error => reject(error));
  });

export const updateNote = note =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let updatingNote = realm.objectForPrimaryKey(
            NOTELIST_SCHEMA,
            note.id
          );
          updatingNote.title = note.title;
          updatingNote.description = note.description;
          updatingNote.date = note.date;
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export const queryAllNoteList = () =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        let allNoteList = realm.objects(NOTELIST_SCHEMA);
        resolve(allNoteList);
      })
      .catch(error => reject(error));
  });

export const deleteNote = noteId =>
  new Promise((resolve, reject) => {
    Realm.open(databaseOptions)
      .then(realm => {
        realm.write(() => {
          let deletingNote = realm.objectForPrimaryKey(NOTELIST_SCHEMA, noteId);
          realm.delete(deletingNote);
          resolve();
        });
      })
      .catch(error => reject(error));
  });

export default new Realm(databaseOptions);
