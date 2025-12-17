import {
  FlatList,
  Image,
  Platform,
  Pressable,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import Icon from "react-native-vector-icons/FontAwesome";
import { useEffect, useState } from "react";
import Banner from "../componets/Banner";
import { getProduct } from "../action/getProduct";
import Card from "../componets/Card";
import { useProductModal } from "../store/storeProduct";
import { useUserModal } from "../store/user";

function TypesScreens({ navigation }) {
  const [searchInput, setSearch] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [, setLoading] = useState(false);
  const { user, removeUser } = useUserModal((state) => state);
  const [typecoffee] = useState("hot");
  const [Result, setResult] = useState(null);
  const { Product, addProduct } = useProductModal((state) => state);
  useEffect(() => {
    if (Result?.length > 0 && searchInput) {
      setResult(Result.filter((ele) => ele.title.includes(searchInput)));
    }
    if (!Boolean(searchInput)) {
      setResult(Product);
    }

    // scrollViewRef.current.scrollToEnd({ animated: true });
  }, [searchInput]);

  useEffect(() => {
    setLoading(true);
    getProduct(typecoffee).then((res) => {
      setResult(res);
      addProduct(res);
      setLoading(false);
    });
  }, []);

  return (
    <View
      style={{ flex: 1 }}
      behavior={Platform.OS == "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      <View style={styles.container}>
        <StatusBar
          animated={true}
          backgroundColor="#61dafb"
          barStyle={"light-content"}
        />

        <LinearGradient
          colors={["#313131", "#222222"]}
          style={[styles.styleGrad, { height: user.name ? 350 : 200 }]}
        >
          {user?.address ? (
            <>
              <View style={styles.styleProfile}>
                <View>
                  <Text style={[styles.text]}>{user.name}</Text>
                  <Text style={styles.textWhite}>{user.address}</Text>
                </View>
                <Pressable
                  style={styles.menu}
                  onPress={() => setShowMenu((prev) => !prev)}
                >
                  <Image source={require("../assets/profile.png")} />
                </Pressable>
              </View>
              {showMenu && (
                <View style={styles.dropdownMenu}>
                  <Pressable
                    onPress={() => {
                      // هنا تعملي logout
                      removeUser();
                      setShowMenu(false);
                      navigation.navigate("login");
                    }}
                    style={styles.dropdownItem}
                  >
                    <Text style={{ color: "black" }}>Logout</Text>
                  </Pressable>
                </View>
              )}
              <View style={styles.searchSection}>
                <Icon
                  style={styles.searchIcon}
                  name="search"
                  size={20}
                  color="#fff"
                  onPress={() => navigation.navigate("Home")}
                />
                <TextInput
                  style={styles.input}
                  placeholder="User Nickname"
                  onChangeText={setSearch}
                  underlineColorAndroid="transparent"
                  value={searchInput}
                />
                <Pressable style={styles.menu}>
                  <Image
                    source={require("../assets/setting-4.png")}
                    width={20}
                    height={20}
                  />
                </Pressable>
              </View>
            </>
          ) : (
            <>
              <View>
                <Pressable
                  style={{
                    flexDirection: "row",

                    marginTop: 50,
                    paddingHorizontal: 20,
                    // backgroundColor: "red",
                    justifyContent: "flex-end",
                  }}
                  onPress={() => navigation.navigate("login")}
                >
                  <Text style={{ fontSize: 24, color: "#fff" }}>Login</Text>
                </Pressable>
              </View>
            </>
          )}
        </LinearGradient>

        <Banner />
        <View
          style={{
            flex: 5,
            alignItems: "center",
            marginVertical: 20,
            width: "100%",
            paddingHorizontal: 30,
          }}
        >
          <FlatList
            style={{ paddingVertical: 10, marginBottom: 100, width: "100%" }}
            data={Result || []}
            initialNumToRender={10}
            renderItem={({ item }) => (
              <Pressable
                onPress={() => navigation.navigate("ProductDetail", { item })}
              >
                <Card {...item} />
              </Pressable>
            )}
            keyExtractor={(item) => item.id.toString()}
            numColumns={2} // ✅ number of columns you want
            columnWrapperStyle={{ justifyContent: "center", gap: 30 }}
            ItemSeparatorComponent={() => <View style={{ height: 16 }} />}
          />
        </View>
      </View>
    </View>
  );
}
export default TypesScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  styleGrad: {
    width: "100%",
  },
  styleProfile: {
    flexDirection: "row",
    marginVertical: 50,
    alignContent: "center",
    justifyContent: "space-around",
  },
  text: {
    fontSize: 16,
    color: "gray",
  },
  textWhite: {
    fontSize: 20,
    color: "white",
  },
  searchSection: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#313131",
    borderRadius: 16,
    padding: 10,
    marginHorizontal: 25,
  },
  searchIcon: {
    padding: 10,
  },
  input: {
    backgroundColor: "#313131",
    color: "#989898",
    flex: 1,
  },
  menu: {
    backgroundColor: "#C67C4E",
    padding: 12,
    borderRadius: 10,
  },
  typeStyle: {
    backgroundColor: "white",
    padding: 10,
    borderRadius: 8,
    marginHorizontal: 10,
  },
  viewType: {
    paddingHorizontal: 16,
    flexDirection: "row",
  },
  active: {
    backgroundColor: "#C67C4E",
  },
  dropdownMenu: {
    position: "absolute",
    top: 120, // تعديل حسب مكان الـ button
    right: 0,
    left: 0,
    backgroundColor: "#ffffffff",
    borderRadius: 10,
    padding: 10,
    zIndex: 1000,
  },
  dropdownItem: {
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
});
