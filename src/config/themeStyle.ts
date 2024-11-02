import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f5f5f5",
      padding: 20,
    },
    loginForm: {
      padding: 20,
      backgroundColor: "white",
      borderRadius: 10,
      marginBottom: 20,
      marginTop: 120,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 5 },
      shadowOpacity: 0.3,
      shadowRadius: 10,
      elevation: 5,

      
    },
    title: {
      fontSize: 24,
      fontWeight: "bold",
      marginBottom: 20,
      color: "#333",
    },
    subtitle: {
      fontSize: 18,
      fontWeight: "bold",
      marginTop: 20,
      marginBottom: 10,
      color: "#333",
    },
    input: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    smallInput: {
      backgroundColor: "white",
      padding: 10,
      borderRadius: 5,
      width: 100,
      borderWidth: 1,
      borderColor: "#ddd",
    },
    button: {
      backgroundColor: "#007AFF",
      padding: 15,
      borderRadius: 10,
      alignItems: "center",
      marginVertical: 10,
    },
    buttonText: {
      color: "white",
      fontSize: 10,
      fontWeight: "bold",
    },
    secondaryButton: {
      backgroundColor: "#E0E0E0",
    },
    disabledButton: {
      backgroundColor: "#B0B0B0",
    },
    linkText: {
      color: "#007AFF",
      textAlign: "center",
      marginTop: 15,
    },
    prestamoItem: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    prestamoPrestatario: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
    },
    prestamoMonto: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#007AFF",
    },
    prestamoFecha: {
      fontSize: 14,
      color: "#666",
    },
    prestamoEstadoContainer: {
      paddingHorizontal: 10,
      paddingVertical: 5,
      borderRadius: 15,
    },
    prestamoEstado: {
      fontSize: 14,
      color: "white",
      fontWeight: "bold",
    },
    detailCard: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    detailText: {
      fontSize: 16,
      marginBottom: 10,
      color: "#333",
    },
    configItem: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    logoutButton: {
      backgroundColor: "#FF3B30",
      marginTop: 30,
    },
    dashboardCard: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 4,
      elevation: 3,
    },
    dashboardText: {
      fontSize: 16,
      marginBottom: 10,
      color: "#333",
    },
    riskSummary: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginVertical: 20,
    },
    riskText: {
      fontSize: 16,
      marginBottom: 5,
      color: "#333",
    },
    profileCard: {
      backgroundColor: "white",
      padding: 20,
      borderRadius: 10,
      marginBottom: 20,
    },
    profileItem: {
      marginBottom: 15,
    },
    profileLabel: {
      fontSize: 16,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 5,
    },
    profileValue: {
      fontSize: 16,
      color: "#666",
    },
    reporteItem: {
      backgroundColor: "white",
      padding: 15,
      borderRadius: 10,
      marginBottom: 15,
    },
    reporteTitulo: {
      fontSize: 18,
      fontWeight: "bold",
      color: "#333",
      marginBottom: 5,
    },
    reporteDescripcion: {
      fontSize: 14,
      color: "#666",
    },
  });
  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");
  // const [isLoading, setIsLoading] = useState(false);

  // const handleLogin = async () => {
  //   setIsLoading(true);
  //   try {
  //     // Simular una llamada a la API
  //     await new Promise((resolve) => setTimeout(resolve, 2000));
  //     // Aquí iría la lógica real de autenticación
  //     await AsyncStorage.setItem("userToken", "dummy-auth-token");
  //     navigation.replace("MainDrawer");
  //   } catch (error) {
  //     Alert.alert("Error", "No se pudo iniciar sesión");
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };