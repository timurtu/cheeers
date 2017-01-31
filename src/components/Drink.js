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
} from 'react-native'
import { apiURL } from '../globals'

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

      <View style={[
        styles.ingredients,
        { opacity: isShowing ? 1 : 0 }
      ]}>
        {ingredients.map((ingredient, i) =>
          <Text key={i}>
            - {ingredient}
          </Text>
        )}
      </View>

      <View style={[
        styles.instructions,
        {opacity: isShowing ? 1 : 0}
      ]}>
        <Text>
          {instructions}
        </Text>
      </View>
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
    borderRadius: 4,
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
