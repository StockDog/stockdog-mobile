import { StyleSheet } from "react-native";
import colors from "../colors";

export default StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: colors.dark,
    alignItems: "center"
  },
  content: {
    flex: 0.9,
    justifyContent: "center"
  },
  horizontal: {
    flexDirection: "row",
    position: "absolute",
    top: 300,
    bottom: 0,
    left: -147
  }
});
