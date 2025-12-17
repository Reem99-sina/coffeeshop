import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TextInput,
  Platform,
  Alert,
} from "react-native";
import ButtonCustom from "../componets/ButtonCustom";
import { useState } from "react";
import { commonStyles } from "../styles/common";
import { Formik } from "formik";
import { SigninSchema } from "../validation/userData";
import Icon from "react-native-vector-icons/FontAwesome";
// import { LoginRequest } from "../action/requestUser";
import { TouchableOpacity } from "react-native";
import { LoginRequest } from "../action/requestUser";
import { useUserModal } from "../store/user";

function LoginScreens({ navigation }) {
  const { addUser } = useUserModal((state) => state);

  const [form] = useState({
    password: "",
    email: "",
  });

  let [loading, setLoading] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#2f3334ff" barStyle="light-content" />

      <ScrollView contentContainerStyle={styles.scrollviewcontainer}>
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
            justifyContent: "space-between",
          }}
        >
          <Icon
            name="arrow-left"
            size={30}
            onPress={() => navigation.goBack()}
          />
          <Text style={commonStyles.title}>Sign in</Text>

          {/* <Text style={styles.mainText}>order</Text> */}
        </View>

        <Formik
          initialValues={form}
          validationSchema={SigninSchema}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const result = await LoginRequest(values);
              if (result.user) {
                addUser({ ...result.user, token: result.token });
                navigation.goBack();
              } else {
                Alert.alert("Login Failed", result.message || "Error");
              }
            } catch (err) {
              throw err;
            } finally {
              setLoading(false);
            }
          }}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
          }) => (
            <>
              <TextInput
                style={commonStyles.input}
                placeholder="Email"
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
                value={values.email}
              />
              {touched.email && errors.email && (
                <Text style={commonStyles.error}>{errors.email}</Text>
              )}

              <TextInput
                style={commonStyles.input}
                placeholder="Password"
                secureTextEntry
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
                value={values.password}
              />
              {touched.password && errors.password && (
                <Text style={commonStyles.error}>{errors.password}</Text>
              )}

              <View style={styles.loginContainer}>
                <Text style={styles.loginText}>Don't have an account? </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate("register")}
                >
                  <Text style={styles.loginLink}>register</Text>
                </TouchableOpacity>
              </View>
              <ButtonCustom
                title="Login"
                onPress={handleSubmit}
                loading={loading}
              />
            </>
          )}
        </Formik>

        {/* <ButtonCustom title="Create Account" onPress={handleSubmitButton} /> */}
      </ScrollView>
    </SafeAreaView>
  );
}

export default LoginScreens;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  textMain: {
    fontWeight: "bold",
    color: "#fff",
    fontSize: 30,
    width: "60%",
  },
  textParagrahp: {
    color: "gray",
    fontSize: 16,
    width: "60%",
  },
  scrollviewcontainer: {
    paddingTop: Platform.OS === "ios" ? 40 : 90, // ✅ fixes status bar issue
    paddingHorizontal: 20,
    flex: 1,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 20,
  },
  loginText: {
    fontSize: 14,
    color: "#555",
  },
  loginLink: {
    fontSize: 14,
    color: "#1e90ff",
    fontWeight: "bold",
  },
});
