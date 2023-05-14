import { UndoableState } from "@mr96/use-timeline";
import { useNavigation } from "@react-navigation/native";
import React, { useEffect, useMemo, useState } from "react";
import { View } from "react-native";
import { Appbar, Portal, Snackbar, Text, TextInput } from "react-native-paper";
import { BSON } from "realm";
import { Note } from "../../database";

export interface INoteitemProps {
  data: {
    currentHistory: { text: string; title: string };
    setHistory: React.Dispatch<
      React.SetStateAction<{ text: string; title: string }>
    >;
    undo: () => void;
    redo: () => void;
    internal: UndoableState<{ text: string; title: string }>;
    canUndo: boolean;
    canRedo: boolean;
    _id: BSON.ObjectId;
    note: Note;
    saveNote: ({ text, title }: { text: string; title: string }) => void;
    deleteNote: () => void;
  };
}

const NoteItem = ({ data }: INoteitemProps) => {
  const [snacVisible, setSnackVisible] = useState(false);
  const note = useMemo(() => {
    return data.note;
  }, []);
  const [text, setText] = useState(data.note.text);
  const [title, setTitle] = useState(data.note.title);
  const navigator = useNavigation();
  const handleTitleChange = (title: string) => {
    setTitle(title);
  };

  const handleTextChange = (text: string) => {
    setText(text);
  };

  useEffect(() => {
    data.saveNote({ text: text, title: title });
    if (
      data.internal.timeline[data.internal.index].text != text ||
      data.internal.timeline[data.internal.index].title != title
    ) {
      data.setHistory({ title: title, text: text });
    }
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
        <Appbar.Action
          icon={"undo"}
          disabled={!data.canUndo}
          onPress={() => {
            setText(data.internal.timeline[data.internal.index - 1].text);
            setTitle(data.internal.timeline[data.internal.index - 1].title);
            data.undo();
          }}
        />
        <Appbar.Action
          icon={"redo"}
          disabled={!data.canRedo}
          onPress={() => {
            setText(data.internal.timeline[data.internal.index + 1].text);
            setTitle(data.internal.timeline[data.internal.index + 1].title);
            data.redo();
          }}
        />
        <Appbar.Action
          icon={"share-variant-outline"}
          onPress={() => {
            // data.saveNote.discard();
          }}
        />
        <Appbar.Action
          icon={"delete-outline"}
          onPress={() => {
            data.deleteNote();
            navigator.navigate("Home" as never);
          }}
        />
        <Appbar.Action
          icon={"content-save-outline"}
          onPress={() => {
            setSnackVisible(true);
            data.setHistory({ text, title });
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
          <Text>{data._id.toHexString()}</Text>
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
