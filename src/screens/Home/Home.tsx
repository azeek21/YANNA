import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { observer } from "mobx-react";
import { useCallback, useState } from "react";
import { StyleSheet } from "react-native";
import { FAB, Portal } from "react-native-paper";
import { BSON } from "realm";
import Header from "../../components/Header/Header";
import NotesList from "../../components/NotesList/NotesList";
import { Note, realmContext } from "../../database";

const { useRealm } = realmContext;

const App = observer(() => {
  const [fabVisible, setFabVisible] = useState(true);
  const navigator = useNavigation();
  const { useRealm } = realmContext;
  const realm = useRealm();

  const createNote = () => {
    return realm.write(() => {
      return realm.create<Note>("Note", {
        title: "",
        text: "",
        _id: new BSON.ObjectId(),
      });
    });
  };

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
            navigator.navigate("Note", {
              noteId: createNote()._id.toHexString(),
            });
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
