import { createStackNavigator } from "@react-navigation/stack";
import SeguridadScreen from "../screens/SeguridadScreen";
import DrawerNavigator from "./DrawerNavigator";
import LoginScreen from "../screens/LoginScreen";
import DetallePrestamoScreen from "../screens/DetallePrestamoScreen";
import PrestamosOtorgadosScreen from "../screens/PrestamosOtorgadosScreen";
import EnhancedRiskAnalysis from "../view/EnhancedRiskAnalysis";
import NewLoanCreation from "../screens/NewLoanCreation";


const Stack = createStackNavigator();

// Navegación Principal
const MainStackNavigator = () => (
    <Stack.Navigator initialRouteName="Login">
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Screen
        name="MainDrawer"
        component={DrawerNavigator}
        options={{ headerShown: false }}
      />
      <Stack.Screen name="Detalle Prestamo" component={DetallePrestamoScreen} />
      <Stack.Screen name="Seguridad" component={SeguridadScreen} />
      <Stack.Screen name="Prestamos Otorgados" component={PrestamosOtorgadosScreen} />
      <Stack.Screen name="Gestion de Riesgos" component={EnhancedRiskAnalysis} />
        {/* <Stack.Screen name="CollectionRouteManagement" component={CollectionRouteManagement} />
        <Stack.Screen name="CollectorAssignment" component={CollectorAssignment} />
        <Stack.Screen name="CollectionTracking" component={CollectionTracking} /> */}
      <Stack.Screen name="Nuevo Prestamo" component={NewLoanCreation} />



    </Stack.Navigator>
  );


  export default MainStackNavigator; 