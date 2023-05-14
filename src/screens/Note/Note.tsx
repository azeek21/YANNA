import { useTimeline } from "@mr96/use-timeline";
import { RouteProp } from "@react-navigation/native";
import { useState } from "react";
import { BSON } from "realm";
import NoteItem from "../../components/NoteItem/NoteItem";
import { Note as TNote, realmContext } from "../../database";
import useDebouncer from "../../hooks/useDebouncer";
type Nprops = {
  Note: { noteId: string };
};

const { useRealm, useObject, useQuery } = realmContext;

const Note: React.FC = ({ route }: { route: RouteProp<Nprops, "Note"> }) => {
  const note = useObject(TNote, new BSON.ObjectId(route.params.noteId))!;
  const [text, setText] = useState<string>(note.text);
  const [title, setTitle] = useState<string>(note.title);
  const realm = useRealm();
  const {
    state: currentHistory,
    setState: setHistory,
    undo,
    redo,
    canUndo,
    canRedo,
    internal,
  } = useTimeline<{ title: string; text: string }>({
    title: title,
    text: text,
  });

  const lazySaveNote = useDebouncer(function ({
    text,
    title,
  }: {
    text: string;
    title: string;
  }) {
    realm.write(() => {
      (note.text = text), (note.title = title);
    });
  },
  800);

  const lazySetHistory = useDebouncer(
    ({ text, title }: { text: string; title: string }) => {
      setHistory({ text, title });
    },
    800
  );

  const deleteNote = () => {
    realm.write(() => {
      realm.delete(note);
    });
  };

  return (
    <>
      <NoteItem
        data={{
          setHistory: lazySetHistory,
          saveNote: lazySaveNote,
          internal,
          undo,
          redo,
          canRedo,
          canUndo,
          currentHistory,
          _id: note._id,
          note: note,
          deleteNote,
        }}
      />
    </>
  );
};

export default Note;
