/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React from 'react';
import { FlatList, ActivityIndicator, StyleSheet, Text, View  } from 'react-native';

export default class FetchExample extends React.Component {

  constructor(props){
    super(props);
    this.state ={ isLoading: true}
  }

  componentDidMount(){
    return fetch('https://facebook.github.io/react-native/movies.json')
      .then((response) => response.json())
      .then((responseJson) => {

        this.setState({
          isLoading: false,
          dataSource: responseJson.movies,
        }, function(){

        });

      })
      .catch((error) =>{
        console.error(error);
      });
  }



  render(){

    if(this.state.isLoading){
      return(
        <View style={{flex: 1, padding: 20}}>
          <ActivityIndicator/>
        </View>
      )
    }

    return(
      <View style={{flex: 1, paddingTop:20}}>
        <FlatList
          data={this.state.dataSource}
          renderItem={({item}) => <Text> <Text style={styles.nameMovie}>{item.title}</Text> <Text style={styles.yearMovie}> {item.releaseYear}</Text></Text>}
          keyExtractor={({id}, index) => id}
        />
      </View>
    );
  }

}
    const styles = StyleSheet.create({
      nameMovie: {
        fontSize: 30,
        color: 'grey',
      },
      yearMovie: {
        fontSize: 15,
        color: 'teal',
      }
    });