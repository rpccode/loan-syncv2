 import { useState } from "react";
import { Alert, ScrollView, Text } from "react-native";
import { CustomInput, CustomButton } from "../components";
import { styles } from "../config/themeStyle";

// Pantalla de Evaluación de Solicitud de Préstamo
const EvaluarSolicitudScreen = ({ navigation }) => {
    const [monto, setMonto] = useState("");
    const [plazo, setPlazo] = useState("");
    const [tasaInteres, setTasaInteres] = useState("");
    const [puntuacionCrediticia, setPuntuacionCrediticia] = useState("");
    const [ingresosMensuales, setIngresosMensuales] = useState("");
  
    const evaluarSolicitud = () => {
      // Aquí iría la lógica para evaluar la solicitud
      const puntuacion = parseInt(puntuacionCrediticia);
      const ingresos = parseFloat(ingresosMensuales);
      const montoSolicitado = parseFloat(monto);
  
      let recomendacion = "";
      if (puntuacion > 700 && ingresos > montoSolicitado * 0.1) {
        recomendacion = "Aprobado";
      } else if (puntuacion > 600 && ingresos > montoSolicitado * 0.15) {
        recomendacion = "Aprobado con condiciones";
      } else {
        recomendacion = "Rechazado";
      }
  
      Alert.alert("Evaluación de Solicitud", `Recomendación: ${recomendacion}`);
    };
  
    return (
      <ScrollView style={styles.container}>
        {/* <Text style={styles.title}>Calculadora de Préstamo</Text> */}
        <CustomInput
          placeholder="Monto solicitado"
          value={monto}
          onChangeText={setMonto}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Plazo en meses"
          value={plazo}
          onChangeText={setPlazo}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Tasa de interés propuesta"
          value={tasaInteres}
          onChangeText={setTasaInteres}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Puntuación crediticia del solicitante"
          value={puntuacionCrediticia}
          onChangeText={setPuntuacionCrediticia}
          keyboardType="numeric"
        />
        <CustomInput
          placeholder="Ingresos mensuales del solicitante"
          value={ingresosMensuales}
          onChangeText={setIngresosMensuales}
          keyboardType="numeric"
        />
        <CustomButton
          title="Evaluar Solicitud"
          onPress={evaluarSolicitud}
          style={undefined}
          textStyle={undefined}
        />
      </ScrollView>
    );
  };

 
  
  export default EvaluarSolicitudScreen;

  