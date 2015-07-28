'use strict';

var React = require('react-native');

var SearchPage = require('./SearchPage');

var {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  NavigatorIOS,
  Component
} = React;

class AdoptAPet extends Component{
  render() {
    return (
      <NavigatorIOS
        style={styles.container}
        initialRoute={{
          title: 'Adopt A Pet',
          component: SearchPage
        }}/>
    );
  } 
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

AppRegistry.registerComponent('AdoptAPet', () => AdoptAPet);
