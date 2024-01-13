import AsyncStorage from '@react-native-async-storage/async-storage';

class Storage {
    static storeData = async (value) => {
        console.log('value', value)
        try {
          const jsonValue = JSON.stringify(value);
          console.log('jsonValue', jsonValue)
          await AsyncStorage.setItem('user', jsonValue);
          return true;
        } catch (e) {
          // saving error
          return false;
        }
      };

      static getData = async () => {
        try {
          const value = await AsyncStorage.getItem('user');
          console.log(value);
          if (value !== null) {
            return JSON.parse(value);
          }
        } catch (e) {
          // error reading value
          return null;
        }
      };
      
      
}

export default Storage;