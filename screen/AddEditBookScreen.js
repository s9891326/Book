import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TextInput, ToastAndroid } from 'react-native';


export default class AddEditBook extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: "",
            publicationDate: "",
            description: "",
            id: ""
        }
    }

    saveAndEditNewBook = () => {
        if (this.state.id) {
            return fetch("https://demo.api-platform.com${this.state.id}", {
                method: "PATCH",
                headers: {
                    "Contect-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    author: this.state.author,
                    publicationDate: this.state.publicationDate,
                    description: this.state.description,
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.props.navigation.navigate("Home")
                })
                .catch((error) => {
                    alert("error");
                });
        } else {
            return fetch("https://demo.api-platform.com/books", {
                method: "POST",
                headers: {
                    "Contect-Type": "application/json;charset=utf-8"
                },
                body: JSON.stringify({
                    author: this.state.author,
                    publicationDate: this.state.publicationDate,
                    description: this.state.description,
                })
            })
                .then((response) => response.json())
                .then((responseJson) => {
                    this.props.navigation.navigate("Home");
                    ToastAndroid.show("save success", ToastAndroid.SHORT);
                })
                .catch((error) => {
                    alert("error");
                });
        }
    }



    render() {
        this.state.id = this.props.navigation.getParam('id', '');
        console.log("id = " + this.state.id);
        return (
            <View style={styles.container}>
                <TextInput
                    style={styles.contextText}
                    onChangeText={(author) => this.setState({ author })}
                    placeholder='Author'
                    value={this.state.author} />
                <TextInput
                    style={styles.contextText}
                    onChangeText={(publicationDate) => this.setState({ publicationDate })}
                    placeholder='Created at'
                    value={this.state.publicationDate} />
                <TextInput
                    style={styles.description}
                    onChangeText={(description) => this.setState({ description })}
                    value={this.state.description}
                    multiline={true} />
            </View>
        );
    }

    componentWillMount() {
        this.state.description = this.props.navigation.getParam('description', '');
        this.state.author = this.props.navigation.getParam('author', '');
        this.state.publicationDate = this.props.navigation.getParam('publicationDate', '');
        this.props.navigation.setParams({
            save: this.goSave,
            back: this.goBack
        });
    }

    goSave = () => {
        this.saveAndEditNewBook();
        //this.props.navigation.navigate('AddAndEditBook');
    }

    goBack = () => {
        this.props.navigation.goBack();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            title: "Add new book",
            headerTitleStyle: {
                textAlign: 'center',
                flexGrow:1,
            },
            headerRight: (
                <Text
                    style={styles.bar}
                    onPress={navigation.getParam('save')}>
                    Save
                </Text>
            ),
            headerLeft: (
                <Text
                    style={styles.bar}
                    onPress={navigation.getParam('back')}>
                    Back
                </Text>
            ),
        };
    };
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '100%',
    },
    bar: {
        fontSize: 16,
        color: '#FFFFFF',
        margin: 10,
    },
    contextText: {
        margin: 10,
        backgroundColor: "#FFFFFF",
    },
    description: {
        margin: 10,
        backgroundColor: "#FFFFFF",
        height: 100,
    },
    title: {
        fontSize: 20,
        textAlign: 'center',
        color: "#FFFFFF",
        alignItems: 'center',
        justifyContent: 'center',
    }
});
