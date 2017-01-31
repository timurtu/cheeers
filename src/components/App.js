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
  TouchableHighlight,
} from 'react-native'
import DrinkCard from './DrinkCard'
import { apiURL } from '../globals'

class App extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      drinks: []
    }
  }

  componentWillMount() {
    this.newDrink()
  }

  newDrink() {

    this.setState({
      isLoading: true
    })

    fetch(apiURL)
      .then(res => res.json())
      .then(data => {

        this.setState({
          drinks: [
            {
              id: data.id,
              title: data.title,
              instructions: data.instructions,
              ingredients: data.ingredients,
            },
            ...this.state.drinks,
          ],
          isLoading: false
        })
      })

  }

  previousDrink() {

    const { drinks } = this.state

    const save = drinks[0]
    const newDrink = drinks[1]
    drinks[0] = newDrink
    drinks[1] = save
    this.setState({
      drinks,
      isLoading: false
    })
  }

  showComments() {

    console.warn('show comments and ratings')
  }

  render() {

    const drink = this.state.drinks[0]

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

        <DrinkCard
          onSwipeForward={() => {
            this.newDrink()
          }}

          onSwipeBack={reset => {

            if(this.state.drinks.length === 1) {
              reset()
            } else {
              this.setState({
                isLoading: true
              })
              this.previousDrink()
            }
          }}

          onSwipeUp={() => {
            this.showComments()
          }}

          image={drink.image}
          title={drink.title}
          id={drink.id}
          instructions={drink.instructions}
          ingredients={drink.ingredients.map(i => i.measurement + i.title)}
        />

        <View style={styles.offset}/>
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
  },
  logoTop: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  offset: {
    flex: 1
  }
})

export default App
