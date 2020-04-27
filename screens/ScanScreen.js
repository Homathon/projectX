import * as WebBrowser from 'expo-web-browser';
import * as React from 'react';
import { Platform, PixelRatio } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';
import { MonoText } from '../components/StyledText';
import {
  Text,
  View,
  StyleSheet, Alert, TouchableOpacity,
  Image
} from 'react-native';
import { Camera } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { Button } from 'react-native-elements';
import BillContext from '../BillContext'

export default function HomeScreen() {
  const [hasPermission, setHasPermission] = React.useState(null);
  const [scanned, setScanned] = React.useState(false);
  const [newItem, setNewItem] = React.useState({});
  const [modal, setModal] = React.useState({ display: 'none' });
  const { list, setList } = React.useContext(BillContext)

  const db = [
    {
      name: ' حليب صافيو المراعي صغير',
      code: 6281022180251,
      avatar_url: require('../assets/images/milk.jpg'),
      price: 1.0,
      quntity: 1,
    },
    {
      name: ' حليب صافيو المراعي صغير',
      code: '-iPKfvO!w_',
      avatar_url: require('../assets/images/milk.jpg'),
      price: 1.0,
      quntity: 1,
    }
  ]
  React.useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    setScanned(true);
    // alert(data)
    for (x in db) {
      if (db[x].code == data.substring(data.indexOf('-'))) {
        setNewItem(db[x])
        setModal({ display: 'block' })
      }
    }
  };
  const addtoCart = () => {
    setModal({ display: 'none' })
    setScanned(false)
    list.push(newItem)
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }


  // this.handleTourch = this.handleTourch.bind(this);
  // const [torchOn, setTorchOn] = React.useState(false)

  // onBarCodeRead = (e) => {
  //   Alert.alert("Barcode value is" + e.data, "Barcode type is" + e.type);
  // }

  // handleTourch = (value) => {
  //   if (value === true) {
  //     setTorchOn(false);
  //     RNCamera.Constants.FlashMode.on
  //   } else {
  //     setTorchOn(true);
  //     RNCamera.Constants.FlashMode.off
  //   }
  // }


  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      {/* {scanned && <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />} */}
      <View id="myModal" style={[styles.modal, modal]}>

        <View style={styles.modalContent}>
          <Text style={styles.close}
            onPress={() => {
              setModal({ display: 'none' })
              setScanned(false)
            }}>&times;
          </Text>
          <Image
            source={newItem.avatar_url}
            style={{ width: 100, height: 100, marginLeft: 100 }}
          />
          <Text style={{ textAlign: 'right', marginBottom: 10 }} >{newItem.name + ' - ' + newItem.price + 'ر.س'}</Text>
          <Button raised
            title='أضف للفاتورة'
            onPress={() => addtoCart()}
            buttonStyle={{ backgroundColor: '#69CA26' }}
            containerStyle={{ marginLeft: 50, width: 200, marginBottom: 10 }}
          />
        </View>

      </View>
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
  modal: {
    position: 'absolute', /* Stay in place */
    zIndex: 1, /* Sit on top */
    paddingTop: PixelRatio.getPixelSizeForLayoutSize(100), /* Location of the box */
    left: 0,
    top: 0,
    width: '100%', /* Full width */
    height: '100%', /* Full height */
    // overflow: 'auto', /* Enable scroll if needed */
    backgroundColor: 'rgb(0,0,0)', /* Fallback color */
    backgroundColor: 'rgba(0,0,0,0.4)', /* Black w/ opacity */
    textAlign: 'center'
  },

  /* Modal Content */
  modalContent: {
    backgroundColor: '#fefefe',
    margin: 'auto',
    padding: PixelRatio.getPixelSizeForLayoutSize(2),
    // border: '1px solid #888',
    borderRadius: 20,
    borderColor: '#fefefe',
    borderWidth: PixelRatio.getPixelSizeForLayoutSize(1),
    width: '80%',
    left: 50,
  },

  /* The Close Button */
  close: {
    color: '#aaaaaa',
    // float: 'right',
    fontSize: 28,
    fontWeight: 'bold',
  },

  // close:hover,
  // close:focus: {
  //   color: '#000',
  //   textDecoration: none,
  //   cursor: pointer,
  // },

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
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
