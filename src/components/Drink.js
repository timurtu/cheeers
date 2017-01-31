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

class FadeInView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      fadeAnim: new Animated.Value(325), // init opacity 0
    };
  }

  componentDidMount() {
    Animated.timing(          // Uses easing functions
      this.state.fadeAnim,    // The value to drive
      { toValue: 0 }            // Configuration
    ).start();                // Don't forget start!
  }

  render() {
    return (
      <Animated.View
        style={{
          transform: [
            {translateX: this.state.fadeAnim}
          ]
        }}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class Drink extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowingInfo: false,
      dragging: false
    }
  }

  render() {

    const {
      title,
      instructions,
      ingredients,
      id,
      onSwipeForward,
      onSwipeBack,
      onSwipeUp
    } = this.props

    return (
      <FadeInView>
        <View
          style={styles.card}
        >
          <TouchableHighlight
            onPress={this.toggleInfo.bind(this)}
          >
            <View>
              <Image
                style={[
                styles.image,
                { opacity: this.state.isShowingInfo ? .125 : 1 },
              ]}
                source={{uri: `${apiURL}/image/${id}`}}
              />

              <Ingredients
                ingredients={ingredients}
                show={this.state.isShowingInfo}
              />

              <Instructions show={this.state.isShowingInfo}>
                {instructions}
              </Instructions>
            </View>
          </TouchableHighlight>

          <Text style={styles.title}>
            {title}
          </Text>

          {/*<TouchableHighlight*/}
            {/*onPress={() => {*/}
            {/*onSwipeForward()*/}
          {/*}}*/}
          {/*>*/}
            {/*<Text>Next Drink</Text>*/}
          {/*</TouchableHighlight>*/}

          {/*<TouchableHighlight*/}
            {/*onPress={() => {*/}
            {/*onSwipeBack()*/}
          {/*}}*/}
          {/*>*/}
            {/*<Text>Previous Drink</Text>*/}
          {/*</TouchableHighlight>*/}

          {/*<TouchableHighlight onPress={() => {*/}
          {/*onSwipeUp()*/}
        {/*}}>*/}
            {/*<Text>Show Comments and Ratings</Text>*/}
          {/*</TouchableHighlight>*/}
        </View>
      </FadeInView>
    )
  }

  toggleInfo() {

    this.setState({
      isShowingInfo: !this.state.isShowingInfo
    })
  }
}

const styles = StyleSheet.create({
  card: {
    width: 325
  },
  image: {
    borderColor: '#000',
    borderWidth: 2,
    shadowColor: 'rgba(0, 0, 0, .125)',
    shadowOpacity: 1,
    width: 325,
    height: 475,
  },
  title: {
    fontSize: 24,
    borderColor: '#000',
    borderWidth: 2,
    padding: 8,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, .125)',
    shadowOpacity: 1,
  },
  instructions: {
    position: 'absolute',
    bottom: 0,
    padding: 20
  },
  ingredients: {
    position: 'absolute',
    padding: 20,
  }
})

export default Drink
