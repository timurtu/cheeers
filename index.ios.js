import React, { Component } from 'react'
import { AppRegistry } from 'react-native'
import App from './src/components/App'

const cheeers = () => <App/>

AppRegistry.registerComponent('cheeers', () => cheeers)

export default cheeers
