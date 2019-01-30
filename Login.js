import React, { Component } from "react";
import { StackActions, NavigationActions } from "react-navigation";
import logo from "../assets/logo.png";
import {
  View,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  AsyncStorage,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  ActivityIndicator
} from "react-native";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UsersActions from "../store/actions/users";
import { TextInputMask } from "react-native-masked-text";
// import styles from './styles';

class Login extends Component {
  static navigationOptions = {
    header: null
  };

  state = {
    login: "",
    senha: "",
    usulogado: []
  };

  async componentWillUnmount() {
    await this.setState({
      login: "",
      senha: ""
    });
  }

  handleLogin = async () => {
    const { login, senha } = this.state;

    if (!login.length || !senha.length) return;

    await this.props.addUserRequest(login, senha);

    await this.setState({
      senha: ""
    });
  };

  navigateToMenu = () => {
    const resetAction = StackActions.reset({
      index: 0,
      actions: [NavigationActions.navigate({ routeName: "Menu" })]
    });

    this.props.navigation.dispatch(resetAction);
  };

  error = () => {
    return (
      <Text style={{ color: "red", fontWeight: "800" }}>
        {this.props.users.error}
      </Text>
    );
  };

  mostrar = () => {
    if (this.props.users.loading) {
      return (
        <View
          style={{ justifyContent: "center", alignItems: "center", flex: 1 }}
        >
          <ActivityIndicator size="large" color="#023059" />
        </View>
      );
    } else {
      return (
        <View style={styles.content}>
          <View>
            <Image source={logo} style={styles.logo} />
          </View>
          <TextInputMask
            ref={ref => (this._myDatetimeField = ref)}
            style={styles.input}
            keyboardType="numeric"
            placeholder="CPF"
            value={this.state.login}
            onChangeText={text =>
              this.setState({ login: this._myDatetimeField.getRawValue() })
            }
            returnKeyType="next"
            onSubmitEditing={() => this.passwordInput.focus()}
            type="cpf"
          />
          <TextInput
            style={styles.input}
            placeholder="Senha"
            secureTextEntry
            keyboardType="number-pad"
            value={this.state.senha}
            onChangeText={text => this.setState({ senha: text })}
            returnKeyType="send"
            ref={input => (this.passwordInput = input)}
            onSubmitEditing={async () => {
              await this.handleLogin;
            }}
          />
          <TouchableOpacity style={styles.button} onPress={this.handleLogin}>
            <Text style={styles.buttonText}>Entrar</Text>
          </TouchableOpacity>
          {this.error()}
        </View>
      );
    }
  };

  render() {
    return (
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === "ios" ? "padding" : null}
      >
        {this.mostrar()}
      </KeyboardAvoidingView>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users,
  count: state.users.length
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFF"
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 30
  },
  logo: {
    height: 100,
    width: 100,
    resizeMode: "contain"
  },
  input: {
    borderWidth: 1,
    borderColor: "#DDD",
    borderRadius: 5,
    height: 44,
    paddingHorizontal: 15,
    alignSelf: "stretch",
    marginTop: 15
  },

  button: {
    height: 44,
    alignSelf: "stretch",
    marginTop: 10,
    backgroundColor: "#023059",
    borderRadius: 5,
    justifyContent: "center",
    alignItems: "center"
  },

  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold"
  }
});
