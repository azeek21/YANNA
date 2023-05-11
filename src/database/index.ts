import { createRealmContext } from "@realm/react";
import Realm from "realm";

// Define your object model
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

const realmConfig: Realm.Configuration = {
  schema: [Note],
};

const realmContext = createRealmContext(realmConfig);

export { Note, realmContext };
