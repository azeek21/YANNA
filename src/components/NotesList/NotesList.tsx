import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  ScrollView,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";
import { Card, IconButton, Text } from "react-native-paper";
import { BSON } from "realm";
import useDatabase from "../../database";

export interface INoteData {
  title: string;
  text: string;
  _id: BSON.ObjectId;
}

const CardItem = ({ noteData }: { noteData: INoteData }) => {
  const text = noteData.text;
  const title = noteData.title ? noteData.title : noteData.text.slice(0, 15);
  const updated = text.length > 60 ? text.slice(0, 60) + "..." : text;
  const navivation = useNavigation();

  return (
    <Card
      style={styles.card}
      onPress={() => {
        navivation.navigate("Note", { noteId: noteData._id.toHexString() });
      }}
    >
      <Card.Content style={{ paddingBottom: 5 }}>
        <Text
          variant="titleMedium"
          style={{ padding: 0, margin: 0, fontWeight: "bold" }}
        >
          {title}
        </Text>
        <Text variant="titleMedium">{updated}</Text>
        <View style={styles.card_bottom}>
          <Text variant="labelLarge">29 may 1970</Text>
          <IconButton
            icon={"pin"}
            animated
            onPress={() => {
              alert("BOSILDI");
            }}
            mode="contained"
            size={16}
          />
        </View>
      </Card.Content>
    </Card>
  );
};

const NotesList = () => {
  const [open, setOpen] = useState(false);
  const windowWidth = useWindowDimensions().width;
  const { getAllNotes } = useDatabase();
  const cardsData = getAllNotes();
  console.log("render");

  const n_rows = Math.floor(windowWidth / 150);
  const arrs: Array<JSX.Element[]> = new Array(n_rows)
    .fill(null)
    .map((_) => []);

  let tmp = 0;
  for (let i = 0; i < cardsData.length; i++) {
    arrs[tmp].push(<CardItem key={i} noteData={cardsData[i]} />);
    if (tmp === n_rows - 1) {
      tmp = 0;
    } else {
      tmp += 1;
    }
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={styles.container}>
        {arrs.map((row, index) => {
          return (
            <View key={`${row}_${index}`} style={styles.row_container}>
              {row}
            </View>
          );
        })}
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: "2%",
    flexDirection: "row",
    gap: 10,
  },
  row_container: {
    flex: 1,
    paddingBottom: 10,
    rowGap: 10,
    minWidth: 150,
    maxWidth: 200,
  },
  card_bottom: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-start",
  },
  card: {
    maxHeight: 200,
    width: "100%",
  },
});

export default NotesList;
