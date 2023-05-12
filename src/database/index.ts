import { createRealmContext } from "@realm/react";
import Realm, { BSON } from "realm";
import { Note } from "./models";
const realmConfig: Realm.Configuration = {
  schema: [Note],
};

const realmContext = createRealmContext(realmConfig);

export { Note, realmContext };

export default function useDatabase() {
  const { useRealm, useObject } = realmContext;
  const realm = useRealm();
  // console.log("USEDATABASE");
  const getAllNotes = () => {
    return realm.objects<Note>("Note");
  };

  const createNote = ({ title, text }: { title: string; text: string }) => {
    console.log("deleting");
    return realm.write(() => {
      return realm.create<Note>("Note", {
        _id: new Realm.BSON.ObjectId(),
        title: title,
        text: text,
      });
    });
  };

  const deleteNote = (note: Note) => {
    console.log("deleting");
    realm.write(() => {
      realm.delete(note);
    });
  };

  const getNote = (noteId: BSON.ObjectId) => {
    // console.log("note fetch");
    return useObject(Note, noteId);
  };

  const updateNote = (
    note: {
      _id: BSON.ObjectId;
      text: string;
      title: string;
    },
    noteObj: Note
  ) => {
    console.log("updating", note);
    return realm.write(() => {
      noteObj.text = note.text;
      noteObj.title = note.title;
    });
  };

  return {
    getAllNotes,
    createNote,
    getNote,
    deleteNote,
    updateNote,
  };
}
