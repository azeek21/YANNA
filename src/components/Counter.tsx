import { observer } from "mobx-react";
import { View } from "react-native";
import { IconButton, Text } from "react-native-paper";
import { useCounterStore } from "../store/store";
import styles from "../styles/styles";

const Counter = observer(() => {
  const { count, increment, decrement } = useCounterStore();

  return (
    <View style={styles.container}>
      <IconButton
        icon={"minus"}
        mode="contained-tonal"
        disabled={count == 0}
        onPress={decrement}
      />

      <Text variant="displayMedium">{count}</Text>

      <IconButton
        icon={"plus"}
        mode="contained-tonal"
        disabled={count == 10}
        onPress={increment}
      />
    </View>
  );
});

export default Counter;
