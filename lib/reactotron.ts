import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  Reactotron.configure({ name: 'Noodle' }) // controls connection & communication settings
    .useReactNative() // add built-in react native plugins, including networking
    .connect(); // let's connect!

  // @ts-ignore
  console.tron = Reactotron;
}

export default Reactotron;
