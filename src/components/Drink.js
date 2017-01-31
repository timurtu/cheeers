/**
 * Created by timur on 1/30/17.
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  TouchableHighlight,
  Animated
} from 'react-native'
import { apiURL } from '../globals'


const Ingredients = ({
  ingredients,
  show
}) => (
  <View style={[
    styles.ingredients,
    { opacity: show ? 1 : 0 }
  ]}>
    {ingredients.map((ingredient, i) =>
      <Text key={i}>
        - {ingredient}
      </Text>
    )}
  </View>
)

const Instructions = ({
  children,
  show
}) => (
  <View style={[
    styles.instructions,
    {opacity: show ? 1 : 0}
  ]}>
    <Text>
      {children}
    </Text>
  </View>
)

const Drink = ({
  ingredients,
  instructions,
  id,
  isShowing,
  toggleInfo
}) => (
  <TouchableHighlight onPress={toggleInfo}>
    <View>
      <Image
        style={[ 
          styles.image, 
          { opacity: isShowing ? .125 : 1 }, 
        ]}
        source={{uri: `${apiURL}/image/${id}`}}
      />

      <Ingredients
        ingredients={ingredients}
        show={isShowing}
      />

      <Instructions
        show={isShowing}
      >
        {instructions}
      </Instructions>
    </View>
  </TouchableHighlight>
)


const styles = StyleSheet.create({
  card: {
    width: 325,
  },
  image: {
    borderColor: '#000',
    borderWidth: 2,
    shadowColor: 'rgba(0, 0, 0, .125)',
    shadowOpacity: 1,
    width: 325,
    height: 475,
  },
  instructions: {
    position: 'absolute',
    bottom: 0,
    padding: 10
  },
  ingredients: {
    position: 'absolute',
    padding: 10,
  },
})

export default Drink
