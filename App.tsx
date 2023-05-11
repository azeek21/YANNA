import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react";
import { Provider as PaperProvider } from "react-native-paper";
import { realmContext } from "./src/database";
import App from "./src/screens/Home/Home";
import Note from "./src/screens/Note/Note";

const Main = observer(() => {
  const Stack = createNativeStackNavigator();
  const { RealmProvider } = realmContext;
  return (
    <RealmProvider>
      <PaperProvider>
        <NavigationContainer>
          <Stack.Navigator>
            <Stack.Screen
              component={App}
              name="Home"
              options={{ headerShown: false }}
            />
            <Stack.Screen
              name="Note"
              component={Note}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </RealmProvider>
  );
});

export default Main;
