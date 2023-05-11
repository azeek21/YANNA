import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import Header from "../../components/Header/Header";
import NotesList from "../../components/NotesList/NotesList";
import createNote from "../../database/createNote";
import { useNoteStore } from "../../store/store";

const App = observer(() => {
  const [fabVisible, setFabVisible] = useState(true);
  const navigator = useNavigation();
  const notestore = useNoteStore();

  useFocusEffect(
    useCallback(() => {
      setFabVisible(true);
      return () => {
        setFabVisible(false);
      };
    }, [])
  );

  return (
    <>
      <Header />
      <NotesList />
      <Portal>
        <FAB
          style={styles.fab}
          icon={"plus"}
          visible={fabVisible}
          variant="primary"
          onPress={() => {
            setFabVisible(false);
            createNote({ text: "REALM NOTE", title: "REALM" });
            navigator.navigate("Note", { noteId: notestore.createNote() });
          }}
        />
      </Portal>
    </>
  );
});

const styles = StyleSheet.create({
  fab: {
    position: "absolute",
    bottom: 50,
    right: 50,
  },
});
export default App;
