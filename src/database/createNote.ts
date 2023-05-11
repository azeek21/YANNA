import { realmContext } from ".";

const realm = realmContext.useRealm();
const createNote = (note: { text: string; title: string }) => {
  return realm.write(() => {
    return realm.create("Note", {
      _id: new Realm.BSON.ObjectId(),
      title: note.title,
      text: note.text,
    });
  });
};

export default createNote;
