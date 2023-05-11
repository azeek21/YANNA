import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useState } from "react";
import { View } from "react-native";
import { Appbar, Portal, Text, TextInput } from "react-native-paper";
import { useNoteStore } from "../../store/store";

export interface INoteitemProps {
  noteId: string;
}

const NoteItem = observer(({ noteId }: { noteId: number }) => {
  const [fabOpen, setFabOpen] = useState(true);
  const { getNote, updateNote, deleteNote } = useNoteStore();
  const note = getNote(noteId);
  if (!note) return <></>;
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const navigator = useNavigation();

  const saveNote = () => {
    updateNote({ id: noteId, text: text, title: title });
  };

  const handleTitleChange = (title: string) => {
    setTitle(title);
  };

  const handleTextChange = (text: string) => {
    setText(text);
  };

  useFocusEffect(() => {
    return () => {
      saveNote();
    };
  });

  const CardInfo = (
    <Text
      variant="bodySmall"
      style={{
        color: "#858585",
        position: "absolute",
        bottom: "5%",
        left: 10,
      }}
    >
      9 may 2023 11:22
    </Text>
  );
  return (
    <>
      <Appbar.Header>
        <Appbar.Action
          icon={"arrow-left"}
          onPress={() => {
            navigator.navigate("Home" as never);
          }}
        />
        <Appbar.Content title />
        <Appbar.Action icon={"undo"} />
        <Appbar.Action icon={"redo"} />
        <Appbar.Action icon={"image-edit-outline"} />
        <Appbar.Action icon={"share-variant-outline"} disabled />
        <Appbar.Action
          icon={"delete-outline"}
          onPress={() => {
            deleteNote(noteId);
            navigator.navigate("Home" as never);
          }}
        />
        <Appbar.Action icon={"menu"} />
      </Appbar.Header>
      <View>
        <TextInput
          placeholder="Title"
          value={title}
          mode="flat"
          onChangeText={handleTitleChange}
          style={{
            fontSize: 24,
            backgroundColor: "transparent",
            borderColor: "transparent",
            borderWidth: 0,
          }}
          underlineStyle={{ backgroundColor: "transparent" }}
          selectionColor={"#858595"}
          placeholderTextColor={"#858595"}
        />

        <TextInput
          placeholder="Take some notes ..."
          value={text}
          multiline
          onChangeText={handleTextChange}
          style={{
            backgroundColor: "transparent",
          }}
          underlineStyle={{ backgroundColor: "transparent" }}
          selectionColor={"#858585"}
          placeholderTextColor={"#858595"}
        />
        <Portal>{CardInfo}</Portal>
      </View>
    </>
  );
});

export default NoteItem;
