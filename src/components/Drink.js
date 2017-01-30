/**
 * Created by timur on 1/30/17.
 */

import React, { Component } from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { apiURL } from '../globals'

const Ingredients = ({
  ingredients
}) => (
  <View>
    {ingredients.map((ingredient, i) =>
      <Text key={i}>
        - {ingredient}
      </Text>
    )}
  </View>
)

const Drink = ({
  title,
  instructions,
  ingredients,
  id,
  onClick
}) => (
  <View
    onClick={onClick}
    style={styles.card}
  >
    <Image
      style={styles.image}
      source={{uri: `${apiURL}/image/${id}`}}
    />

    <Text style={styles.welcome}>
      {title}
    </Text>

    <Text style={styles.instructions}>{instructions}</Text>

    <Ingredients ingredients={ingredients}/>
  </View>
)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  card: {
    borderColor: '#000',
    borderWidth: 1,
    shadowColor: 'rgba(0, 0, 0, .125)',
    shadowOpacity: 1,
    padding: 20,
    width: 320
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  image: {
    width: 275,
    height: 300
  }
})

export default Drink
