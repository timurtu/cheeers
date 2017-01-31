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
        {...this.props.panResponder.panHandlers}
        style={[
          this.props.style,
          {
            transform: [
              {translateX: this.state.fadeAnim}
            ]
          }
        ]}
      >
        {this.props.children}
      </Animated.View>
    );
  }
}

class DrinkCard extends Component {

  resetStyles() {
    this.setState({
      styles: {
        left: 0,
        top: 0
      }
    })
  }

  constructor(props) {
    super(props)

    this.state = {
      styles: {},
      isShowingInfo: false,
      indicatorOpacity: 0,
      panResponder: PanResponder.create({
        // Ask to be the responder:
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: (evt, gestureState) => true,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,

        onPanResponderGrant: (evt, gestureState) => {
          // The guesture has started. Show visual feedback so the user knows
          // what is happening!

          // gestureState.d{x,y} will be set to zero now
        },
        onPanResponderMove: (evt, gestureState) => {
          // The most recent move distance is gestureState.move{X,Y}

          // The accumulated gesture distance since becoming responder is
          // gestureState.d{x,y}

          if(gestureState.dx < -150) {
            this.setState({
              indicatorOpacity: 1
            })
          } else {
            this.setState({
              indicatorOpacity: 0
            })
          }

          this.setState({
            styles: {
              position: 'relative',
              left: gestureState.dx,
              top: gestureState.dy
            }
          })

        },
        onPanResponderTerminationRequest: (evt, gestureState) => true,
        onPanResponderRelease: (evt, gestureState) => {
          // The user has released all touches while this view is the
          // responder. This typically means a gesture has succeeded

          if (gestureState.dx < -150) {
            this.props.onSwipeForward()

          } else if (gestureState.dx === 0 && gestureState.dy === 0) {
            this.toggleInfo()
          }
          // else if(gestureState.dy < -250) {
          //   this.props.onSwipeUp()
          // }
          else {
            this.resetStyles()
          }

          this.setState({
            indicatorOpacity: 0
          })
        },
        onPanResponderTerminate: (evt, gestureState) => {
          // Another component has become the responder, so this gesture
          // should be cancelled
        },
        onShouldBlockNativeResponder: (evt, gestureState) => {
          // Returns whether this component should block native components from becoming the JS
          // responder. Returns true by default. Is currently only supported on android.
          return true;
        }
      })
    }
  }

  render() {
    return (
      <View>
        <SlideInView
          style={this.state.styles}
          panResponder={this.state.panResponder}
        >
          <Drink
            {...this.props}
            isShowing={this.state.isShowingInfo}
            toggleInfo={this.toggleInfo.bind(this)}
          />

          <Text style={styles.title}>
            {this.props.title}
          </Text>
        </SlideInView>

        <Text style={[styles.indicator, {opacity: this.state.indicatorOpacity}]}>
          Next Drink
        </Text>
      </View>

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
    borderRadius: 4,
    padding: 8,
    textAlign: 'center',
    shadowColor: 'rgba(0, 0, 0, .125)',
    shadowOpacity: 1,
  },
  indicator: {
    position: 'absolute',
    right: 0,
    top: 225,
    fontSize: 20
  }
})

export default DrinkCard
