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
  },
  searchButton: {
    marginTop: 20
  },
  stockList: {
    width: 250,
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
    flexDirection: "row",
    position: "absolute",
    top: 360,
    left: -140,
    bottom: 0,
    height: 300
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
