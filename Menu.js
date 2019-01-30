import React, { Component } from "react";
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ImageBackground,
  TouchableOpacity,
  Image,
  AsyncStorage,
  Alert,
  Dimensions
} from "react-native";
import Icon from "react-native-vector-icons/SimpleLineIcons";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as UsersActions from "../store/actions/users";
const { height } = Dimensions.get("window");
import db from "../config/database";
// import styles from './styles';

class Menu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      entregas: props.users.data.entregas,
      abastecimento: props.users.data.abastecimento,
      despesas: props.users.data.despesas,
      contatos: props.users.data.contatos,
      nome: props.users.data.nome,
      usulogado: [],
      motorista: "",
      modalvisible: false,
      cidade: ""
    };
  }

  static navigationOptions = {
    header: null
  };

  capitalizeFirstLetter = name => {
    return name.charAt(0).toUpperCase() + name.slice(1);
  };

  logout = async () => {
    await AsyncStorage.removeItem("@Kothe:usulogado", err => {
      Alert.alert("Aviso:", "Sessão Encerrada!");
      this.props.navigation.navigate("Login");
    });

    await this.props.logoutUser();
  };

  async componentDidMount() {
    // const { entregas, abastecimento, despesas, nome } = nextProps.users[0];
    // console.tron.log(this.state.entregas);
    // await this.setState({ entregas, abastecimento, despesas, nome });
  }

  entregas = modulo => {
    // console.log(modulo);
    if (modulo !== "S") return;
    return (
      <View style={{ flex: 1 /*backgroundColor: "#456"*/ }}>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            hitSlop={styles.ButtonClickArea}
            onPress={() =>
              this.props.navigation.navigate("LsEntregas", {
                motorista: this.props.users.data.codparc
              })
            }
          >
            <Image
              source={require("../assets/icon_ent.png")}
              style={styles.ButtonIcon}
            />
          </TouchableOpacity>

          <Text style={styles.ButtonText}>Entregas</Text>
        </View>
      </View>
    );
  };

  despesas = modulo => {
    if (modulo !== "S") return;
    return (
      <View style={{ flex: 1 /*backgroundColor: "#456"*/ }}>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            hitSlop={styles.ButtonClickArea}
            onPress={() => this.props.navigation.navigate("Dev")}
          >
            <Image
              source={require("../assets/icon_desp.png")}
              style={styles.ButtonIcon}
            />
          </TouchableOpacity>

          <Text style={styles.ButtonText}>Despesas</Text>
        </View>
      </View>
    );
  };

  abastecimento = modulo => {
    if (modulo !== "S") return;
    return (
      <View style={{ flex: 1 /*backgroundColor: "#456"*/ }}>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            hitSlop={styles.ButtonClickArea}
            onPress={() => this.props.navigation.navigate("AutAbastecimento")}
            // onPress={() => this.props.navigation.navigate("DetAbastecimento")}
          >
            <Image
              source={require("../assets/icon_abast.png")}
              style={styles.ButtonIcon}
            />
          </TouchableOpacity>

          <Text style={styles.ButtonText}>Abastecimento</Text>
        </View>
      </View>
    );
  };

  contatos = modulo => {
    if (modulo !== "S") return;
    return (
      <View style={{ flex: 1 /*backgroundColor: "#456"*/ }}>
        <View
          style={{
            justifyContent: "center",
            alignSelf: "center",
            alignItems: "center"
          }}
        >
          <TouchableOpacity
            hitSlop={styles.ButtonClickArea}
            onPress={() => this.props.navigation.navigate("Contatos")}
          >
            <Image
              source={require("../assets/icon_cont.png")}
              style={styles.ButtonIcon}
            />
          </TouchableOpacity>

          <Text style={styles.ButtonText}>Contatos</Text>
        </View>
      </View>
    );
  };

  render() {
    const { entregas, abastecimento, despesas, nome, contatos } = this.state;
    return (
      <View style={styles.container}>
        <StatusBar
          translucent
          barStyle="light-content"
          backgroundColor="rgba(0,0,0,0)"
        />
        <ImageBackground
          source={require("../assets/back.png")}
          imageStyle={{ opacity: 0.2 }}
          style={{ width: "100%", height: "100%" }}
        >
          <View style={{ flex: 1 }}>
            <Image
              source={require("../assets/kothe-header.png")}
              style={{
                alignSelf: "center",
                alignContent: "center"
              }}
              resizeMode="center"
            />
          </View>
          {/* Entregas */}
          {this.entregas(entregas)}
          {this.despesas(despesas)}
          {this.abastecimento(abastecimento)}
          {this.contatos(contatos)}
          <View style={styles.footer}>
            <TouchableOpacity
              onPress={() => this.props.navigation.navigate("Profile")}
            >
              <View style={{ flexDirection: "row" }}>
                <Icon
                  name="user"
                  size={20}
                  style={{ color: "#FFF", marginRight: 5 }}
                />
                <Text
                  style={{
                    alignContent: "center",
                    color: "#FFF",
                    fontSize: 18
                  }}
                >
                  {nome.toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                this.logout();
              }}
            >
              <Icon name="logout" size={25} style={{ color: "#FFF" }} />
            </TouchableOpacity>
          </View>
        </ImageBackground>
      </View>
    );
  }
}

const mapStateToProps = state => ({
  users: state.users
});

const mapDispatchToProps = dispatch =>
  bindActionCreators(UsersActions, dispatch);

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Menu);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5FCFF"
  },
  Column: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  Button: {
    backgroundColor: "#2980b9",
    height: 100,
    width: 100,
    alignItems: "center",
    justifyContent: "center"
  },
  ButtonClickArea: {
    top: 50,
    bottom: 50,
    left: 100,
    right: 100
  },
  ButtonIcon: {
    width: 70,
    height: 70
  },
  ButtonText: {
    fontSize: 20,
    fontFamily: "roboto",
    color: "#2c3e50",
    textAlign: "center"
  },
  footer: {
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 10,
    flexDirection: "row",
    backgroundColor: "#023059",
    height: 5 * (height / 100)
  }
});
