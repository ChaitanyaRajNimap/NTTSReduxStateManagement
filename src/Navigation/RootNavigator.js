import React from 'react';
import {Text} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {GLOBALSTYLE, COLORS} from '../constants/Theme';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import Favorites from '../screens/Favorites';
import Movies from '../screens/Movies';

const Tab = createBottomTabNavigator();
const tabBarOptions = {
  showLabel: false,
  activeTintColor: COLORS.purplePrimary,
  style: {
    height: '10%',
  },
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBarOptions={tabBarOptions}>
        <Tab.Screen
          name="Movies"
          component={Movies}
          options={{
            tabBarIcon: ({color, size}) => (
              <>
                <MaterialIcons name="movie-filter" color={color} size={size} />
              </>
            ),
          }}
        />
        <Tab.Screen
          name="Favorites"
          component={Favorites}
          options={{
            tabBarIcon: ({color, size}) => (
              <>
                <MaterialIcons name="favorite" color={color} size={size} />
              </>
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
