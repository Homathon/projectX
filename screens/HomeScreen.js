import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Image, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { ScrollView, Directions } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import TouchableScale from 'react-native-touchable-scale'; // https://github.com/kohver/react-native-touchable-scale
// import LinearGradient from 'react-native-linear-gradient'; // Only if no expo
import { LinearGradient } from 'expo-linear-gradient';
import { Card, ListItem, Button, Icon } from 'react-native-elements'
import BillContext from '../BillContext'


export default function HomeScreen() {

  const { list, setList } = React.useContext(BillContext)

  let total = 0
  list.map((l, i) => (
    total += l.price * l.quntity
  ))
  return (
    <View>
      <ScrollView style={{minHeight:645}}>
        {/* {
        list.map((l, i) => (
          <ListItem
            Component={TouchableScale}
            activeScale={0.95} //
            linearGradientProps={{
              colors: ['#FF9800', '#F44336'],
              start: [1, 0],
              end: [0.2, 0],
            }}
            // ViewComponent={LinearGradient} // Only if no expo
            rightTitle={l.name}
            rightTitleStyle={{ color: 'white', fontWeight: 'bold' }}
            rightSubtitleStyle={{ color: 'white' }}
            rightSubtitle={l.subtitle}
          />
        ))
      } */}


        {
          list.map((l, i) => (
            <Card containerStyle={{ padding: 0, borderRadius: 20, }} >
              <ListItem
              containerStyle={{borderRadius: 20, }}
                key={i}
                friction={90}
                tension={100}// These props are passed to the parent component (here TouchableScale)
                rightAvatar={{ rounded: false, source: l.avatar_url }}
                rightTitle={l.name}
                rightTitleStyle={{ width: 200, textAlign: 'right' }}
                subtitle={l.price * l.quntity + ' ر.س'}
                rightSubtitle={l.price + ' ر.س'}
                avatar={{ uri: l.avatar }}
                badge={{ value: l.quntity, status: 'success', containerStyle: { position: 'absolute', top: -4, right: -4 } }}
                // containerStyle={{ margin: 50, backgroundColor:'red' }}
                bottomDivider
              />
            </Card>

          )
          )
        }
      </ScrollView>
        <Text style={styles.total} >المجموع:                                                    {total} ر.س
          </Text>
    </View>
  
  );
}

HomeScreen.navigationOptions = {
  header: null,
};

function DevelopmentModeNotice() {
  if (__DEV__) {
    const learnMoreButton = (
      <Text onPress={handleLearnMorePress} style={styles.helpLinkText}>
        Learn more
      </Text>
    );

    return (
      <Text style={styles.developmentModeText}>
        Development mode is enabled: your app will be slower but you can use useful development
        tools. {learnMoreButton}
      </Text>
    );
  } else {
    return (
      <Text style={styles.developmentModeText}>
        You are not in development mode: your app will run at full speed.
      </Text>
    );
  }
}

function handleLearnMorePress() {
  WebBrowser.openBrowserAsync('https://docs.expo.io/versions/latest/workflow/development-mode/');
}

function handleHelpPress() {
  WebBrowser.openBrowserAsync(
    'https://docs.expo.io/versions/latest/get-started/create-a-new-app/#making-your-first-change'
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 30,
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  totalContainer: {
    position: 'absolute', top: 661,
    backgroundColor: '#fff',
    alignItems: 'flex-end',
  },
  total: {
    backgroundColor: '#fff',
    padding: 20,
    fontSize: 20,
    marginTop: 15,
    alignItems: 'stretch',
  },
  totalNum: {
    fontSize: 20,
    backgroundColor: 'red',
    marginTop: 15,
    minWidth: 1000,
    alignItems: 'flex-start',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
