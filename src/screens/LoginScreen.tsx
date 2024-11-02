import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown, FadeInUp, Layout } from 'react-native-reanimated';
import Svg, { Path, SvgProps } from 'react-native-svg';
import { Ionicons } from '@expo/vector-icons';

const DollarIcon = (props: React.JSX.IntrinsicAttributes & React.JSX.IntrinsicClassAttributes<Svg> & Pick<Readonly<SvgProps>, "pointerEvents" | "title" | "fontSize" | "fontWeight" | "color" | "children" | "hitSlop" | "id" | "needsOffscreenAlphaCompositing" | "onLayout" | "removeClippedSubviews" | "style" | "testID" | "nativeID" | "collapsable" | "renderToHardwareTextureAndroid" | "focusable" | "tabIndex" | "shouldRasterizeIOS" | "isTVSelectable" | "hasTVPreferredFocus" | "tvParallaxProperties" | "tvParallaxShiftDistanceX" | "tvParallaxShiftDistanceY" | "tvParallaxTiltAngle" | "tvParallaxMagnification" | "onStartShouldSetResponder" | "onMoveShouldSetResponder" | "onResponderEnd" | "onResponderGrant" | "onResponderReject" | "onResponderMove" | "onResponderRelease" | "onResponderStart" | "onResponderTerminationRequest" | "onResponderTerminate" | "onStartShouldSetResponderCapture" | "onMoveShouldSetResponderCapture" | "onTouchStart" | "onTouchMove" | "onTouchEnd" | "onTouchCancel" | "onTouchEndCapture" | "onPointerEnter" | "onPointerEnterCapture" | "onPointerLeave" | "onPointerLeaveCapture" | "onPointerMove" | "onPointerMoveCapture" | "onPointerCancel" | "onPointerCancelCapture" | "onPointerDown" | "onPointerDownCapture" | "onPointerUp" | "onPointerUpCapture" | "accessible" | "accessibilityActions" | "accessibilityLabel" | "aria-label" | "accessibilityRole" | "accessibilityState" | "aria-busy" | "aria-checked" | "aria-disabled" | "aria-expanded" | "aria-selected" | "accessibilityHint" | "accessibilityValue" | "aria-valuemax" | "aria-valuemin" | "aria-valuenow" | "aria-valuetext" | "onAccessibilityAction" | "importantForAccessibility" | "aria-hidden" | "aria-modal" | "role" | "accessibilityLabelledBy" | "aria-labelledby" | "accessibilityLiveRegion" | "aria-live" | "accessibilityElementsHidden" | "accessibilityViewIsModal" | "onAccessibilityEscape" | "onAccessibilityTap" | "onMagicTap" | "accessibilityIgnoresInvertColors" | "accessibilityLanguage" | "width" | "height" | "viewBox" | "opacity" | "fill" | "fillOpacity" | "fillRule" | "stroke" | "strokeWidth" | "strokeOpacity" | "strokeDasharray" | "strokeDashoffset" | "strokeLinecap" | "strokeLinejoin" | "strokeMiterlimit" | "vectorEffect" | "clipRule" | "clipPath" | "translate" | "translateX" | "translateY" | "origin" | "originX" | "originY" | "scale" | "scaleX" | "scaleY" | "skew" | "skewX" | "skewY" | "rotation" | "x" | "y" | "transform" | "disabled" | "onPress" | "onPressIn" | "onPressOut" | "onLongPress" | "delayPressIn" | "delayPressOut" | "delayLongPress" | "marker" | "markerStart" | "markerMid" | "markerEnd" | "mask" | "filter" | "font" | "fontStyle" | "fontVariant" | "fontStretch" | "fontFamily" | "textAnchor" | "textDecoration" | "letterSpacing" | "wordSpacing" | "kerning" | "fontFeatureSettings" | "fontVariantLigatures" | "fontVariationSettings"> & { readonly preserveAspectRatio?: string | undefined; } & {}) => (
  <Svg
    width={32}
    height={32}
    viewBox="0 0 24 24"
    fill="none"
    stroke="white"
    strokeWidth={2}
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <Path d="M12 1v22M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
  </Svg>
);

const AuthScreen = ({navigation}) => {
  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const toggleForm = () => setIsLogin(!isLogin);

  const validateForm = () => {
    if (!isLogin && name.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu nombre');
      return false;
    }
    if (email.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu correo electrónico');
      return false;
    }
    if (password.trim() === '') {
      Alert.alert('Error', 'Por favor ingresa tu contraseña');
      return false;
    }
    return true;
  };

  const handleSubmit = () => {
   navigation.replace("MainDrawer");


    // if (validateForm()) {
    //   // Aquí iría la lógica de autenticación
    //   Alert.alert('Éxito', isLogin ? 'Inicio de sesión exitoso' : 'Registro exitoso');
    // }
  };

  const handleForgotPassword = () => {
    Alert.alert('Recuperar contraseña', 'Se enviará un enlace a tu correo electrónico para restablecer tu contraseña.');
  };

  const handleSocialAuth = (platform: string) => {
    Alert.alert('Autenticación social', `Iniciando sesión con ${platform}`);
  };

  const checkPasswordStrength = (text: React.SetStateAction<string>) => {
    setPassword(text);
    let strength = 0;
    if (text.length > 6) strength++;
    if (text.match(/[A-Z]/)) strength++;
    if (text.match(/[0-9]/)) strength++;
    if (text.match(/[^A-Za-z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  return (
    <LinearGradient
      colors={['#0F4C75', '#3282B8', '#BBE1FA']}
      style={styles.container}
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.innerContainer}
      >
        <Animated.View entering={FadeInDown.duration(1000)} style={styles.logoContainer}>
          <View style={styles.logoBackground}>
            <DollarIcon />
          </View>
        </Animated.View>

        <Animated.Text entering={FadeInUp.duration(1000).delay(300)} style={styles.title}>
          {isLogin ? 'Bienvenido de nuevo' : 'Crea tu cuenta'}
        </Animated.Text>

        <Animated.View entering={FadeInUp.duration(1000).delay(600)} style={styles.form}>
          {!isLogin && (
            <Animated.View layout={Layout.springify()}>
              <TextInput
                style={styles.input}
                placeholder="Nombre completo"
                placeholderTextColor="#A0AEC0"
                value={name}
                onChangeText={setName}
              />
            </Animated.View>
          )}
          <TextInput
            style={styles.input}
            placeholder="Correo electrónico"
            placeholderTextColor="#A0AEC0"
            keyboardType="email-address"
            value={email}
            onChangeText={setEmail}
          />
          <View style={styles.passwordContainer}>
            <TextInput
              style={styles.passwordInput}
              placeholder="Contraseña"
              placeholderTextColor="#A0AEC0"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={checkPasswordStrength}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)} style={styles.eyeIcon}>
              <Ionicons name={showPassword ? 'eye-off' : 'eye'} size={24} color="#A0AEC0" />
            </TouchableOpacity>
          </View>
          {!isLogin && (
            <View style={styles.strengthMeter}>
              {[...Array(4)].map((_, index) => (
                <View
                  key={index}
                  style={[
                    styles.strengthBar,
                    index < passwordStrength ? styles.strengthActive : null,
                    { backgroundColor: index < passwordStrength ? 
                      (passwordStrength === 1 ? 'red' : 
                       passwordStrength === 2 ? 'orange' : 
                       passwordStrength === 3 ? 'yellow' : 'green') : '#D1D5DB' }
                  ]}
                />
              ))}
            </View>
          )}
          <TouchableOpacity style={styles.button} onPress={handleSubmit}>
            <Text style={styles.buttonText}>
              {isLogin ? 'Iniciar sesión' : 'Registrarse'}
            </Text>
          </TouchableOpacity>
          {isLogin && (
            <TouchableOpacity onPress={handleForgotPassword} style={styles.forgotPassword}>
              <Text style={styles.forgotPasswordText}>¿Olvidaste tu contraseña?</Text>
            </TouchableOpacity>
          )}
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(1000).delay(900)} style={styles.socialAuth}>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialAuth('Google')}>
            <Ionicons name="logo-google" size={24} color="white" />
            <Text style={styles.socialButtonText}>Google</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.socialButton} onPress={() => handleSocialAuth('Facebook')}>
            <Ionicons name="logo-facebook" size={24} color="white" />
            <Text style={styles.socialButtonText}>Facebook</Text>
          </TouchableOpacity>
        </Animated.View>

        <Animated.View entering={FadeInUp.duration(1000).delay(1200)} style={styles.switchContainer}>
          <TouchableOpacity onPress={toggleForm}>
            <Text style={styles.switchText}>
              {isLogin ? '¿No tienes cuenta? Regístrate' : '¿Ya tienes cuenta? Inicia sesión'}
            </Text>
          </TouchableOpacity>
        </Animated.View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40,
  },
  logoBackground: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 50,
    padding: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
    marginBottom: 30,
  },
  form: {
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    padding: 15,
    marginBottom: 15,
    fontSize: 16,
  },
  passwordContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    borderRadius: 5,
    marginBottom: 15,
  },
  passwordInput: {
    flex: 1,
    padding: 15,
    fontSize: 16,
  },
  eyeIcon: {
    padding: 10,
  },
  strengthMeter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 15,
  },
  strengthBar: {
    flex: 1,
    height: 5,
    borderRadius: 2,
    marginHorizontal: 2,
  },
  strengthActive: {
    backgroundColor: 'green',
  },
  button: {
    backgroundColor: '#4C51BF',
    borderRadius: 5,
    padding: 15,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
  forgotPassword: {
    alignItems: 'center',
    marginTop: 15,
  },
  forgotPasswordText: {
    color: '#4C51BF',
    fontSize: 16,
  },
  socialAuth: {
    marginBottom: 20,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  socialButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 5,
    padding: 15,
    marginBottom: 10,
    marginHorizontal: 10,
    
  },
  socialButtonText: {
    color: 'white',
    fontSize: 16,
    marginLeft: 10,
  },
  switchContainer: {
    alignItems: 'center',
  },
  switchText: {
    color: 'white',
    fontSize: 16,
  },
});

export default AuthScreen;