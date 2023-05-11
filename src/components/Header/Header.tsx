import { observer } from "mobx-react";
import { useState } from "react";
import { StyleSheet } from "react-native";
import { Appbar, IconButton, Menu, Searchbar } from "react-native-paper";

const Header = observer(() => {
  const [searchText, setSearchText] = useState("");
  const [searchVisible, setSearchVisible] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);

  const handleSearch = (text) => {
    setSearchText(text);
  };

  return (
    <Appbar.Header>
      <Appbar.Content title="Notes" />
      <Appbar.Action
        icon={searchVisible ? "arrow-right" : "magnify"}
        onPress={() => setSearchVisible((visible) => !visible)}
      />
      {searchVisible && (
        <Searchbar
          value={searchText}
          style={{ width: "50%" }}
          placeholder="search..."
          onChangeText={handleSearch}
          mode="bar"
        />
      )}
      <Menu
        visible={menuVisible}
        onDismiss={() => setMenuVisible(false)}
        anchor={
          <IconButton
            icon={"menu"}
            onPress={() => setMenuVisible((visible) => !visible)}
          />
        }
      >
        <Menu.Item title="Select All" leadingIcon={"select-all"} />
        <Menu.Item title="Export" leadingIcon={"export"} />
        <Menu.Item title="Import" leadingIcon={"import"} />
        <Menu.Item title="Delete" leadingIcon={"delete"} />
        <Menu.Item title="Share" leadingIcon={"share"} />
      </Menu>
      <Appbar.Action icon={"eye"} />
    </Appbar.Header>
  );
});

const styles = StyleSheet.create({
  container: {},
});

export default Header;
