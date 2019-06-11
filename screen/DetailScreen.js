import React, { Component } from 'react';
import { Platform, StyleSheet, Text, View } from 'react-native';


export default class DetailScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: "",
            author: "",
            publicationDate: ""
        }
    }

    render() {
        this.state.description = this.props.navigation.getParam('description', '');
        this.state.author = this.props.navigation.getParam('author', '');
        this.state.publicationDate = this.props.navigation.getParam('publicationDate', '');

        return (
            <View style={styles.container}>
                <View style={styles.context}>
                    <Text style={styles.contextText}>Author:{this.state.author}</Text>
                    <Text style={styles.contextText}>{this.state.publicationDate.slice(0, 10)}</Text>
                </View>
                <Text style={styles.description}>{this.state.description}</Text>
            </View>
        );
    }

    componentWillMount() {
        this.props.navigation.setParams({
            addEdit: this.goAddEdit,
            back: this.goBack
        });
    }

    
    goAddEdit = () => {
        this.props.navigation.navigate('AddEditBook', {
            description: this.state.description,
            author:  this.state.author,
            publicationDate: this.state.publicationDate,
        });
    }
    
    goBack = () => {
        this.props.navigation.goBack();
    }

    static navigationOptions = ({ navigation }) => {
        return {
            headerTitle: navigation.getParam('title', ''),
            headerRight: (
                <Text
                    style={styles.bar}
                    onPress={navigation.getParam('addEdit')}>
                    Edit
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
        height: '100%',
        padding: 10,
    },
    bar: {
        fontSize: 16,
        color: '#FFFFFF',
        margin: 10,
    },
    context: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    contextText: {
        color: '#AEAEAE',
        height: 20,
    },
    description: {
        fontSize: 20,
        marginTop: 12,
    },
});
