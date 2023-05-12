import { Note, realmContext } from "..";

const { useRealm } = realmContext;
const getAllNotes = () => {
  const realm = useRealm();
  return realm.objects<Note>("Note");
};

export default getAllNotes;
