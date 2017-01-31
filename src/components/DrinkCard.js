/**
 * Created by timur on 1/30/17.
 */

import React, { Component } from 'react'
import {
  View,
  Text,
  Image,
  StyleSheet,
  Animated,
  PanResponder
} from 'react-native'
import Drink from './Drink'

class SlideInView extends Component {
  constructor(props) {
    super(props)
    this.state = {
      fadeAnim: new Animated.Value(325)
    }
  }

  componentDidMount() {
    Animated.timing(
      this.state.fadeAnim,
      { toValue: 0 }
    ).start()
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

class DrinkCard extends Component {

  constructor(props) {
    super(props)
    this.state = {
      isShowingInfo: false,
    }
  }

  render() {
    return (
      <SlideInView>
        <Drink
          {...this.props}
          isShowing={this.state.isShowingInfo}
          toggleInfo={this.toggleInfo.bind(this)}
        />

        <Text style={styles.title}>
          {this.props.title}
        </Text>
      </SlideInView>
    )
  }

  toggleInfo() {
    this.setState({
      isShowingInfo: !this.state.isShowingInfo
    })
  }
}

const styles = StyleSheet.create({
  title: {
    fontSize: 24,
    width: 325,
    borderColor: '#000',
    borderWidth: 2,
    padding: 8,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, .125)',
    shadowOpacity: 1,
  },
})

export default DrinkCard
