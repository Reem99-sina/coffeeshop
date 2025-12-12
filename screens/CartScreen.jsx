import {
  FlatList,
  Image,
  Pressable,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { useOrderModal } from "../store/storeCart";
import { useState } from "react";

function CartScreen({ navigation }) {
  let { order, removeOrder } = useOrderModal((state) => state);
  let [extend, setExtend] = useState(false);

  return (
    <SafeAreaView>
      <StatusBar
        animated={true}
        backgroundColor="#61dafb"
        barStyle={"dark-content"}
      />
      <ScrollView>
        <View style={styles.container}>
          <Icon
            name="arrow-left"
            size={20}
            onPress={() => navigation.goBack()}
          />
          <Text style={styles.mainText}>order</Text>
        </View>
      </ScrollView>

      <FlatList
        data={order}
        scrollEnabled={true}
        style={{ marginBottom: 200 }}
        renderItem={({ item }) => {
          return (
            <>
              <View
                key={item.id}
                style={{
                  flex: 1,
                  borderRadius: 16,
                  marginHorizontal: 10,
                  position: "relative",
                }}
              >
                <Image
                  source={{ uri: item.image }}
                  height={300}
                  style={{ borderRadius: 16 }}
                />
                <View
                  style={{
                    position: "absolute",
                    backgroundColor: "rgba(52, 52, 52, 0.8)",
                    bottom: 0,
                  }}
                >
                  <View style={{ marginVertical: 20, padding: 10, gap: 10 }}>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Text style={{ color: "white" }}>{item.title}</Text>
                      <Text style={{ color: "white" }}>({item.count})</Text>
                    </View>
                    <Text style={{ color: "white" }}>
                      {extend
                        ? item.description
                        : item.description.slice(0, 100)}
                    </Text>
                    <View
                      style={{
                        flexDirection: "row",
                        justifyContent: "space-between",
                      }}
                    >
                      <Pressable onPress={() => setExtend(!extend)}>
                        <Text style={{ color: "#C67C4E" }}>
                          {extend ? "Read Less" : "Read more"}
                        </Text>
                      </Pressable>
                      <Pressable onPress={() => removeOrder(item.id)}>
                        <Icon
                          style={{ color: "red" }}
                          name="remove"
                          size={20}
                        />
                      </Pressable>
                    </View>
                  </View>
                </View>
              </View>
            </>
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ height: 16 }} />}
        ListEmptyComponent={
          <Text style={styles.EmtpyText}>No product in cart</Text>
        }
      />
    </SafeAreaView>
  );
}
export default CartScreen;
const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-around",
    marginVertical: 10,
    alignItems: "center",
    borderBottomWidth: 0.5,
    borderBottomColor: "gray",
    padding: 20,
  },
  mainText: {
    fontWeight: "bold",
    fontSize: 20,
  },
  EmtpyText: {
    alignSelf: "center",
    fontWeight: "bold",
    fontSize: 20,
  },
});
