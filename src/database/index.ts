import { createRealmContext } from "@realm/react";
import Realm from "realm";
import { Note } from "./models";
const realmConfig: Realm.Configuration = {
  schema: [Note],
};

const realmContext = createRealmContext(realmConfig);

export { Note, realmContext };
