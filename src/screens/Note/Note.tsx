import { RouteProp, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { BSON } from "realm";
import NoteItem from "../../components/NoteItem/NoteItem";
import useDatabase from "../../database";

type Nprops = {
  Note: { noteId: string };
};

const Note: React.FC = observer(
  ({ route }: { route: RouteProp<Nprops, "Note"> }) => {
    const navigator = useNavigation();
    const noteId = route.params.noteId;
    const { getNote } = useDatabase();
    const note = getNote(new BSON.ObjectId(noteId));
    return (
      <>
        <NoteItem note={note} />
      </>
    );
  }
);

export default Note;
