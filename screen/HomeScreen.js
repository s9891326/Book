import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View, TouchableOpacity, ScrollView, Button } from 'react-native';
import fetchBook from '../BookAction'

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            isLoading: true,
            dataSource: [],
            id: ""
        }
    }

    componentDidMount() {
        return fetch('https://demo.api-platform.com/books')
            .then((response) => response.json())
            .then((responseJson) => {
                this.setState({
                    isLoading: false,
                    dataSource: responseJson["hydra:member"],
                })
            })
            .catch((error) => {
                alert('error');
            });
    }

    render() {
        console.log("data source = ", this.state.dataSource);
        return (
            <ScrollView>
                <View style={styles.container}>
                    {this.state.dataSource.map((item, index) =>
                        <TouchableOpacity
                            key={item["@id"]}
                            style={styles.book}
                            onPress={() => this.props.navigation.navigate("Detail", {
                                title: item.title,
                                description: item.description,
                                author: item.author,
                                publicationDate: item.publicationDate,
                                id: item["@id"]
                            })}>
                            <View style={styles.bookContainer}>
                                <Text style={styles.title}>{item.title}</Text>
                                <Text style={styles.description}>{item.description}</Text>
                                <Text style={styles.author}>{item.author}</Text>
                                <Text style={styles.author}>{item.publicationDate.slice(0, 10)}</Text>
                            </View>
                        </TouchableOpacity>
                    )}

                </View >
            </ScrollView>
        );
    }

    componentWillMount() {
        this.props.navigation.setParams({
            addEdit: this.goAddEdit,
        });
    }

    goAddEdit = () => {
        this.props.navigation.navigate('AddEditBook', {
            id: this.state.id
        });
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerRight: (
                <Text
                    style={styles.bar}
                    onPress={navigation.getParam('addEdit')}>
                    New
                </Text>
            )
        };
    };
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        backgroundColor: '#F5F5F5',
        width: '100%',
        height: '100%',
    },
    bookContainer: {
        padding: 3,
        textAlign: 'center',
    },
    book: {
        backgroundColor: '#FFFFFF',
        width: '40%',
        margin: '5%',
        aspectRatio: 1,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        height: 32,
        textAlign: 'center',
    },
    description: {
        marginTop: 5,
        marginBottom: 5,
        height: 50,
    },
    author: {
        fontStyle: "italic",
        height: 25,
    },
    bar: {
        fontSize: 16,
        color: '#FFFFFF',
        margin: 10,
    },
});
