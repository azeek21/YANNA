import { realmContext } from "..";
const { useRealm } = realmContext;

const createNote = ({ title, text }: { title: string; text: string }) => {
  const realm = useRealm();
  return realm.write(() => {
    return realm.create("Note", {
      _id: new Realm.BSON.ObjectId(),
      title: title,
      text: text,
    });
  });
};

export default createNote;
