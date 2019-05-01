import React from "react";
import { View, Image, Text, StyleSheet, TouchableOpacity } from "react-native";

const SelectImage = (props: any) => {
  const { item, deleteItem } = props;
  return (
    <>
      <Image
        source={{
          uri: `data:${item.mime};base64,${item.data}`
        }}
        style={styles.item}
      />
      <TouchableOpacity
        style={styles.deleteButton}
        onPress={() => deleteItem(item)}
      >
        <Text style={styles.x}>X</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  item: {
    alignItems: "center",
    flexBasis: 0,
    flexGrow: 1,
    margin: 4,
    padding: 60
  },
  deleteButton: {
    borderRadius: 50,
    borderColor: "transparent",
    backgroundColor: "#EE2020",
    borderWidth: 0.5,
    alignItems: "center",
    justifyContent: "center",
    height: 14,
    width: 14,
    marginRight: 15
  },
  x: {
    color: "#FFF",
    fontSize: 10
  }
});

export default SelectImage;
