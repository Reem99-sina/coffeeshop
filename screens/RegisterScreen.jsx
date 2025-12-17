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
import { SignupSchema } from "../validation/userData";
import Icon from "react-native-vector-icons/FontAwesome";
import { RegisterRequest } from "../action/requestUser";
import { TouchableOpacity } from "react-native";
import { useUserModal } from "../store/user";

function RegisterScreens({ navigation }) {
  const [loading, setLoading] = useState(false);
  const { addUser } = useUserModal((state) => state);
  const [form] = useState({
    name: "",
    address: "",
    email: "",
    phone: "",
    password: "",
  });

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
          <Text style={commonStyles.title}>Sign Up</Text>

          {/* <Text style={styles.mainText}>order</Text> */}
        </View>

        <Formik
          initialValues={form}
          validationSchema={SignupSchema}
          onSubmit={async (values) => {
            try {
              setLoading(true);
              const result = await RegisterRequest(values);
              if (result.user) {
                addUser(result.user);
                navigation.navigate("Home");
              } else {
                Alert.alert("Registration Failed", result.message || "Error");
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
                placeholder="Full Name"
                onChangeText={handleChange("name")}
                onBlur={handleBlur("name")}
                value={values.name}
              />
              {touched.name && errors.name && (
                <Text style={commonStyles.error}>{errors.name}</Text>
              )}

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
                placeholder="Phone"
                onChangeText={handleChange("phone")}
                onBlur={handleBlur("phone")}
                value={values.phone}
              />
              {touched.phone && errors.phone && (
                <Text style={commonStyles.error}>{errors.phone}</Text>
              )}

              <TextInput
                style={commonStyles.input}
                placeholder="Address"
                onChangeText={handleChange("address")}
                onBlur={handleBlur("address")}
                value={values.address}
              />
              {touched.address && errors.address && (
                <Text style={commonStyles.error}>{errors.address}</Text>
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
                <Text style={styles.loginText}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("login")}>
                  <Text style={styles.loginLink}>Login</Text>
                </TouchableOpacity>
              </View>
              <ButtonCustom
                title="Create Account"
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

export default RegisterScreens;
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
