import { Component } from 'react';
import * as Font from 'expo-font';
import Routes from './routes';


export default class App extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      fontLoaded: false,
    };
  }

  async componentDidMount() {
    await Font.loadAsync({
      'assistant-bold': require('./assets/fonts/Assistant-Bold.otf'),
      assistant: require('./assets/fonts/Assistant-Regular.otf'),
      'assistant-semibold': require('./assets/fonts/Assistant-SemiBold.otf'),
      'assistant-extralight': require('./assets/fonts/Assistant-ExtraLight.otf'),
      'assistant-light': require('./assets/fonts/Assistant-Light.otf'),
    });
    this.setState({ fontLoaded: true });
  }

  render() {
    const { fontLoaded } = this.state;
    return (
      fontLoaded ? Routes() : null
    );
  }
}
