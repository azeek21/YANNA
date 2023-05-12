import Realm from "realm";

class Note extends Realm.Object<Note> {
  _id!: Realm.BSON.ObjectId;
  text!: string;
  title!: string;

  static schema = {
    name: "Note",
    properties: {
      _id: "objectId",
      text: "string",
      title: "string",
    },
    primaryKey: "_id",
  };
}

export { Note };
