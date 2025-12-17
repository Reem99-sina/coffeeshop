import { Dimensions, StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";

export function IconsMenu({navigationOptions}) {
  return (
    <View style={styles.styleHeader}>
      <Icon
        name="home"
        size={30}
        color={navigationOptions.route.name == "Detail" ? "#C67C4E" : "gray"}
        onPress={() => navigationOptions.navigation.navigate("Detail")}
      />
      <Icon
        name="heart"
        size={30}
        color={navigationOptions.route.name == "Faviorte" ? "#C67C4E" : "gray"}
        onPress={() => navigationOptions.navigation.navigate("Faviorte")}
      />
      <Icon
        name="shopping-bag"
        size={30}
        color={
          navigationOptions.route.name == "shopping-bag" ? "#C67C4E" : "gray"
        }
        onPress={() => navigationOptions.navigation.navigate("shopping-bag")}
      />
      {/* <Icon name="notification" size={30} color="#C67C4E" onPress={()=>{}}/> */}
    </View>
  );
}

const styles = StyleSheet.create({
  styleHeader: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    top: Dimensions.get("window").height - 100,
    height: 100,
    width: "100%",
    backgroundColor: "#fff",
    justifyContent: "space-around",
  },

});