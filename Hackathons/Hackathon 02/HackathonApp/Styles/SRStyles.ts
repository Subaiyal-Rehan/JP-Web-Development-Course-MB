import { StyleSheet, useColorScheme } from 'react-native';
import SRColors from './SRColors';

const getColor = (colorScheme: any) => {
  return SRColors[colorScheme === 'dark' ? 'dark' : 'light'];
};

const useSRStyles = () => {
  const colorScheme = useColorScheme();
  const currentColors = getColor(colorScheme);

  return StyleSheet.create({
    textColor: {
      color: currentColors.text,
    },
    background: {
      backgroundColor: currentColors.background,
    },
    flex1: {
      flex: 1,
    },
    w100h100: {
      width: '100%',
      height: '100%',
    },
    headerStyle: {
      backgroundColor: currentColors.headerBackground,
    },
    headerTextColor: {
      color: currentColors.headerText,
    },
    authBackground: {
      backgroundColor: '#1D102D',
      borderRadius: 10,
    },
    alignSelfCenter: {
      alignSelf: 'center',
    },
    input: {
      height: 50,
      borderColor: '#ddd',
      borderWidth: 1,
      borderRadius: 8,
      paddingHorizontal: 10,
      marginBottom: 15,
      fontSize: 16,
      color: 'white',
      backgroundColor: 'transparent',
    },
    loginButton: {
      backgroundColor: '#6200EE',
      height: 50,
      borderRadius: 8,
      flexDirection: 'row',
      gap: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    loginButtonText: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    bottomNavbar: {
      position: 'absolute',
      bottom: 20,
      flexDirection: 'row',
      gap: 20,
      justifyContent: 'center',
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.9)',
      paddingHorizontal: 50,
      overflow: 'hidden',
      width: '95%',
      borderRadius: 50,
    },
    navbarButton: {
      paddingVertical: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    navbarText: {
      color: 'grey',
    },
    categoryContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    categoryBox: {
      width: 66,
      height: 66,
      overflow: 'hidden',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#1D102D',
      borderRadius: 10,
    },
    HomeLast: {
      bottom: 80,
    },
    BrowseResName: {
      backgroundColor: 'rgba(0,0,0,0.7)',
      position: 'relative',
      bottom: 70,
    },
    ResCard: {
      flexDirection: 'row',
      width: 210,
    },
    SingleTextContainer: {
      paddingHorizontal: 10,
      paddingVertical: 10,
      width: '90%',
      alignSelf: 'center',
      backgroundColor: 'rgba(0,0,0,0.3)',
      borderRadius: 10,
    },
    BrowserResCard: {
      position: 'relative',
      bottom: 40,
    },
    cartDel: {
      backgroundColor: 'rgba(0,0,0,0.3)',
      padding: 5,
      borderRadius: 20,
    },
    cartTotal: {
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    accountContainer: {
      backgroundColor: '#1D102D',
      position: 'absolute',
      top: 50,
      left: 35,
      width: '80%',
      borderRadius: 20,
    },
    orderContainer: {
      borderWidth: 2,
      borderColor: 'white',
      borderRadius: 20,
    },
  });
};

export default useSRStyles;
