import React from 'react';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { Ionicons } from '@expo/vector-icons';
import ConfiguracionScreen from '../screens/ConfiguracionScreen';
import DashboardScreen from '../screens/DashboardScreen';
import EvaluarSolicitudScreen from '../screens/EvaluarSolicitudScreen';
import PerfilScreen from '../screens/PerfilScreen';
import PrestamosOtorgadosScreen from '../screens/PrestamosOtorgadosScreen';
import ReportesAnalisisScreen from '../screens/ReportesAnalisisScreen';
import AdvancedProfileSettings from '../view/AdvancedProfileSettings';
import AILoanEvaluation from '../view/AILoanEvaluation';
import CalendarScreen from '../view/CalendarScreen';
import EnhancedDocumentManagement from '../view/EnhancedDocumentManagement';
import EnhancedRiskAnalysis from '../view/EnhancedRiskAnalysis';
import LoanDashboard from '../view/LoanDashboard';
import PredictiveAnalysisScreen from '../screens/PredictiveAnalysisScreen';
import CollectionRouteManagement from '../view/CollectionRouteManagement';
import CollectionTracking from '../view/CollectionTracking';
import CollectorAssignment from '../view/CollectorAssignment';
import LoanGeneralSettings from '../screens/LoanConfiguratonScreens';


const Drawer = createDrawerNavigator();

// Navegación del Drawer
const DrawerNavigator = ({userPlan}) => (
  <Drawer.Navigator>
    <Drawer.Screen 
      name="Dashboard de prestamos" 
      component={LoanDashboard} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="speedometer-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Préstamos Otorgados" 
      component={PrestamosOtorgadosScreen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="cash-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Calculadora de prestamos" 
      component={EvaluarSolicitudScreen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="calculator-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Reportes y Análisis" 
      component={ReportesAnalisisScreen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="bar-chart-outline" size={size} color={color} />
        ),
      }}
    />

    {userPlan === 'Premiun' && (
      <>
           <Drawer.Screen 
      name="Calendario" 
      component={CalendarScreen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        ),
      }}
    />
     <Drawer.Screen 
      name="Gestión de Rutas de Cobro" 
      component={CollectionRouteManagement} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        ),
      }}
    />
 
    <Drawer.Screen 
      name="Asignación de Cobradores a Rutas" 
      component={CollectorAssignment} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        ),
      }}
    />
     <Drawer.Screen 
      name="Seguimiento de Cobros Realizados" 
      component={CollectionTracking} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="calendar-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Análisis Predictivo" 
      component={PredictiveAnalysisScreen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="trending-up-outline" size={size} color={color} />
        ),
      }}
    />

   
    <Drawer.Screen 
      name="Evaluación con IA" 
      component={AILoanEvaluation} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="hardware-chip-outline" size={size} color={color} />
        ),
      }}
    />
    <Drawer.Screen 
      name="Documentos Mejorados" 
      component={EnhancedDocumentManagement} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="file-tray-stacked-outline" size={size} color={color} />
        ),
      }}
    />
      
      
      </>
    )}

     <Drawer.Screen 
      name="Análisis de Riesgo" 
      component={EnhancedRiskAnalysis} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="alert-circle-outline" size={size} color={color} />
        ),
      }}
    />
       <Drawer.Screen 
      name="Perfil de Usuario" 
      component={PerfilScreen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="person-outline" size={size} color={color} />
        ),
      }}
    />
        <Drawer.Screen 
      name="Configuración de Prestamos" 
      component={LoanGeneralSettings} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="options-outline" size={size} color={color} />
        ),
      }}
    />
       <Drawer.Screen 
      name="Configuración" 
      component={ConfiguracionScreen} 
      options={{
        drawerIcon: ({ color, size }) => (
          <Ionicons name="settings-outline" size={size} color={color} />
        ),
      }}
    />
  </Drawer.Navigator>
  
  );
  

export default DrawerNavigator;
