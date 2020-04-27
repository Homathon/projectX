import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import * as React from 'react';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import LinksScreen from '../screens/LinksScreen';
import ScanScreen from '../screens/ScanScreen';
import { BillProvider } from '../BillContext'

const BottomTab = createBottomTabNavigator();
const INITIAL_ROUTE_NAME = 'Scan';


export default function BottomTabNavigator({ navigation, route }) {
  // Set the header title on the parent stack navigator depending on the
  // currently active tab. Learn more in the documentation:
  // https://reactnavigation.org/docs/en/screen-options-resolution.html
  navigation.setOptions({ headerTitle: getHeaderTitle(route) });

  return (
    <BillProvider>
    <BottomTab.Navigator initialRouteName={INITIAL_ROUTE_NAME}>
    <BottomTab.Screen
        name="Scan"
        component={ScanScreen}
        options={{
          title: 'مسح',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} src={require('../assets/images/cam.png')}/>,
        }}
      />
      <BottomTab.Screen
        name="Bill"
        component={HomeScreen}
        options={{
          title: 'الفاتورة',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} src={require('../assets/images/bill.png')} />,
        }}
      />
      <BottomTab.Screen
        name="Links"
        component={LinksScreen}
        options={{
          title: 'مساعدة',
          titleStyle:'red',
          tabBarIcon: ({ focused }) => <TabBarIcon focused={focused} src={require('../assets/images/help.png')}/>,
        }}
      />
    </BottomTab.Navigator>
    </BillProvider>
  );
}

function getHeaderTitle(route) {
  const routeName = route.state?.routes[route.state.index]?.name ?? INITIAL_ROUTE_NAME;

  switch (routeName) {
    case 'Bill':
      return 'الفاتورة الحالية';
      case 'Scan':
      return 'امسح على كود القطعة';
    case 'Links':
      return 'المساعدة ';
  }
}
