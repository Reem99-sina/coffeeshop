
import { Image, SafeAreaView, ScrollView, StyleSheet, Text, View ,StatusBar} from 'react-native';
import ButtonCustom from '../componets/ButtonCustom';
function HomeScreens({navigation}) {
  return (
    <>
    <SafeAreaView style={styles.container}>
    <StatusBar animated={true}
      backgroundColor="#61dafb" barStyle={"light-content"}/>
    <ScrollView >
      <View style={styles.scrollviewcontainer}>
      <Image source={require("../assets/image 3.png")} style={{height:400,width:"100%"}} resizeMode={"contain"}/>
      <Text style={styles.textMain}>
      Coffee so good, your taste buds will love it.
      </Text>
      <Text style={styles.textParagrahp}>
      The best grain, the finest roast, the powerful flavor.
      </Text>
      <ButtonCustom title={"Get Started"} onPress={()=>navigation.navigate("Detail")}/>
      </View>
      </ScrollView>
  </SafeAreaView>
  </>
  )
}
export default HomeScreens
const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#000',
     
    },textMain:{
      fontWeight:"bold",
      color:"#fff",
      fontSize:30,
      width:"60%"
    },textParagrahp:{
      color:"gray",
      fontSize:16,
      width:"60%"
    },
    scrollviewcontainer:{
      alignItems: 'center',
      flex:1,
      justifyContent:"center"
    }
  });
  