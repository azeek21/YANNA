import { Note, realmContext } from ".";

const { useRealm, useObject } = realmContext;
const realm = useRealm();

const getAllNotes = () => {
  return realm.objects<Note>("Note");
};

export default getAllNotes;
