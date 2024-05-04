import {
  FlatList,
  Image,
  Pressable,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";

import { useFaviorteModal } from "../store/faviorteCart";
import { useState } from "react";
import { LinearGradient } from "expo-linear-gradient";
// import IconColor from "react-native-vector-icons/AntDesign";

function FaviorteScreen({ navigation }) {
  let [extend, setExtend] = useState(false);

  let { faviorte, addfaviorte, removefaviorte } = useFaviorteModal(
    (state) => state
  );

  return (
    <View>
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
          <Text style={styles.mainText}>faviorte</Text>
        </View>
      </ScrollView>
      
      <FlatList
        data={faviorte}
        scrollEnabled={true}
        style={{marginBottom:200}}
        renderItem={({ item }) => {
          return (
            <>
              <View
                key={item.id}
                style={{ flex: 1, borderRadius: 16, marginHorizontal: 10,position:"relative" }}
              >
                <Image
                  source={{ uri: item.image }}
                  height={300}
                  style={{ borderRadius: 16 }}
                />
                <View style={{position:"absolute",backgroundColor:"rgba(52, 52, 52, 0.8)",bottom:0}}>
                <View style={{ marginVertical: 20,padding:10 }}>
                  <Text style={{color:"white"}}>{item.title}</Text>
                  <Text style={{color:"white"}}>
                    {extend ? item.description : item.description.slice(0, 100)}
                  </Text>
                  <Pressable onPress={() => setExtend(!extend)}>
                    <Text style={{ color: "#C67C4E" }}>
                      {extend ? "Read Less" : "Read more"}
                    </Text>
                  </Pressable>
                </View>
                </View>
                
              </View>
            </>
          );
        }}
        keyExtractor={(item) => item.id}
        ItemSeparatorComponent={<View style={{ height: 16 }} />}
        ListEmptyComponent={
          <Text style={styles.EmtpyText}>No product faviorte</Text>
        }
      />
      
    </View>
  );
}
export default FaviorteScreen;
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
