import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import Header from "../../components/Header/Header";
import NotesList from "../../components/NotesList/NotesList";
import useDatabase, { realmContext } from "../../database";

const App = observer(() => {
  const [fabVisible, setFabVisible] = useState(true);
  const navigator = useNavigation();
  const { useRealm } = realmContext;
  const realm = useRealm();
  const { createNote } = useDatabase();

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
            const new_note = createNote({ text: "text", title: "new realm " });
            console.log(new_note);
            navigator.navigate("Note", { noteId: new_note._id });
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
