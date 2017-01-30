/**
 * Created by timur on 1/22/17.
 */

import React, { Component } from 'react'
import { StyleSheet, ListView, Text, View, Image } from 'react-native'
import Drink from './Drink'
import {apiURL} from '../globals'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true
    }
  }

  componentDidMount() {

    this.newDrink()
  }

  newDrink() {
    fetch(apiURL)
      .then(res => res.json())
      .then(drink => {

        console.log(drink)

        this.setState({
          isLoading: false,
          id: drink.id,
          title: drink.title,
          instructions: drink.instructions,
          ingredients: drink.ingredients,
          image: drink.image
        })
      })
  }


  render() {
    const app = this.state.isLoading ?
      <Image
        style={styles.icon}
        source={require('../../res/cheeers-logo.png')}
      /> :
      <View>
        <Drink
          onClick={() => {
            this.newDrink()
          }}
          image={this.state.image}
          title={this.state.title}
          id={this.state.id}
          instructions={this.state.instructions}
          ingredients={this.state.ingredients.map(i => i.measurement + i.title)}
        />
      </View>


    return (
      <View style={styles.container}>
        {app}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  icon: {
    width: 100,
    height: 100
  },
})

export default App
