import { RouteProp, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import NoteItem from "../../components/NoteItem/NoteItem";

type Nprops = {
  Note: { noteId: number };
};

const Note: React.FC = observer(
  ({ route }: { route: RouteProp<Nprops, "Note"> }) => {
    const navigator = useNavigation();
    return (
      <>
        <NoteItem noteId={route.params.noteId} />
      </>
    );
  }
);

export default Note;
