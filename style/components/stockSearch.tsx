import { StyleSheet } from "react-native";
// @ts-ignore
import colors from "../colors";

export default StyleSheet.create({
  searchContent: {
    flexDirection: "column"
  },
  searchBar: {
    flexDirection: "row"
  },
  searchButton: {
    marginTop: 30
  },
  stockList: {
    width: 280,
    backgroundColor: colors.grey,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 3
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 6,
    borderRadius: 5,
    maxHeight: 300
  },
  stockListStock: {
    marginBottom: 10,
    padding: 10
    // borderBottomColor: colors.ultraLightGrey,
    // borderBottomWidth: 1
  },
  stockListText: {
    color: colors.bright,
    fontSize: 20
  },
  stockListSubtext: {
    color: colors.white,
    fontSize: 12
  }
});
