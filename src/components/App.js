/**
 * Created by timur on 1/22/17.
 */

import React, { Component } from 'react'
import {
  StyleSheet,
  ListView,
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native'
import Drink from './Drink'
import { apiURL } from '../globals'

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

    this.setState({
      isLoading: true
    })

    fetch(apiURL)
      .then(res => res.json())
      .then(drink => {

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

  previousDrink() {

    console.warn('show previous drink')
  }

  showComments() {

    console.warn('show comments and ratings')
  }

  render() {
    const app = this.state.isLoading ?
      <Image
        style={styles.iconBig}
        source={require('../../res/cheeers-logo.png')}
      /> :
      <View>
        <View style={styles.logoTop}>
          <TouchableHighlight onPress={this.newDrink.bind(this)}>
            <Image
              style={styles.iconSmall}
              source={require('../../res/cheeers-logo.png')}
            />
          </TouchableHighlight>
        </View>

        <Drink
          onSwipeForward={() => {
            this.newDrink()
          }}

          onSwipeBack={() => {
            this.previousDrink()
          }}

          onSwipeUp={() => {
            this.showComments()
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
  iconBig: {
    width: 100,
    height: 100
  },
  iconSmall: {
    width: 36,
    height: 36,
    margin: 40
  },
  logoTop: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  }
})

export default App
