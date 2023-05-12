import { useNavigation } from "@react-navigation/native";
import { useEffect, useState } from "react";
import { View } from "react-native";
import { Appbar, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import { BSON } from "realm";
import useDatabase, { Note } from "../../database";
import useDebouncer from "../../hooks/useDebouncer";

export interface INoteitemProps {
  note: Note | null;
}

const NoteItem = ({ note }: INoteitemProps) => {
  // console.log("render");

  const { updateNote, deleteNote } = useDatabase();
  const [snacVisible, setSnackVisible] = useState(false);

  if (!note) return <></>;
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);
  const navigator = useNavigation();

  const saveNote = useDebouncer(
    (new_note: { _id: BSON.ObjectId; text: string; title: string }) => {
      console.log(new_note);
      updateNote(
        { _id: new_note._id, text: new_note.text, title: new_note.title },
        note
      );
    },
    300
  );

  const handleTitleChange = (title: string) => {
    setTitle(title);
  };

  const handleTextChange = (text: string) => {
    setText(text);
  };

  useEffect(() => {
    saveNote({ _id: note._id, text, title });
    return () => {
      saveNote({ _id: note._id, text, title });
    };
  }, [text, title]);

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
        <Appbar.Action icon={"image-edit-outline"} />
        <Appbar.Action icon={"share-variant-outline"} disabled />
        <Appbar.Action
          icon={"delete-outline"}
          onPress={() => {
            console.log("deleting...");
            deleteNote(note);
            console.log("deleted :v:");
            console.log(note);
            navigator.navigate("Home" as never);
          }}
        />
        <Appbar.Action
          icon={"content-save-outline"}
          onPress={() => {
            saveNote({ _id: note._id, text, title });
            setSnackVisible(true);
            setTimeout(() => {
              setSnackVisible(false);
            }, 3000);
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
        <Portal>
          {CardInfo}

          <Snackbar
            visible={snacVisible}
            onDismiss={() => {
              setSnackVisible(false);
            }}
            icon={"window-close"}
            onIconPress={() => {
              setSnackVisible(false);
            }}
          >
            Saved
          </Snackbar>
        </Portal>
      </View>
    </>
  );
};

export default NoteItem;
