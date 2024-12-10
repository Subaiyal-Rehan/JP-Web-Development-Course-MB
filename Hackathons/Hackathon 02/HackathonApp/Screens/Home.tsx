/* eslint-disable react/react-in-jsx-scope */
import { Image, ImageBackground, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import rncStyles from 'rncstyles';
import useSRStyles from '../Styles/SRStyles';
import SRIcon from '../Components/SRIcon';
import ImageCarousel from '../Components/SRImageCarousel';

const Home = ({ navigation }: any) => {
  const SRStyles = useSRStyles();

  return (
    <View style={[rncStyles.positionRelative, SRStyles.flex1]}>
      <ScrollView contentContainerStyle={SRStyles.flex1} style={[rncStyles.positionRelative]}>
        <ImageBackground
          style={[SRStyles.flex1, rncStyles.flexCenter, rncStyles.justifyContentStart]}
          source={require('../assets/background.png')}
          resizeMode="cover"
        >

          {/* Category Boxes */}
          <View>
            <View style={[rncStyles.flexRow, rncStyles.alignItemsCenter, rncStyles.justifyContentBetween, rncStyles.w90, rncStyles.py1]}>
              <Text style={[rncStyles.textWhite, rncStyles.fs5, rncStyles.textBold]}>Categories</Text>
              <Text style={[rncStyles.textWhite, rncStyles.fs7]}>See all</Text>
            </View>
            <View style={[SRStyles.categoryContainer, rncStyles.mt1]}>
              <TouchableOpacity style={[rncStyles.border1, rncStyles.borderWhite, SRStyles.categoryBox]}>
                <Image source={require('../assets/burger.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[rncStyles.border1, rncStyles.borderWhite, SRStyles.categoryBox]}>
                <Image source={require('../assets/cake.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[rncStyles.border1, rncStyles.borderWhite, SRStyles.categoryBox]}>
                <Image source={require('../assets/taco.png')} />
              </TouchableOpacity>
              <TouchableOpacity style={[rncStyles.border1, rncStyles.borderWhite, SRStyles.categoryBox]}>
                <Image style={SRStyles.w100h100} source={require('../assets/noodle.png')} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[SRStyles.flex1, rncStyles.mt4, rncStyles.positionRelative]}>
            <ImageCarousel images={[
              'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg',
              'https://images.pexels.com/photos/34950/pexels-photo.jpg',
              'https://images.pexels.com/photos/34951/pexels-photo.jpg',
            ]} />
          </View>

          <View style={[rncStyles.positionRelative, SRStyles.HomeLast]}>
            <Image source={require('../assets/Card.png')} />
          </View>
        </ImageBackground>
      </ScrollView>

      <View style={SRStyles.bottomNavbar}>
        <TouchableOpacity style={SRStyles.navbarButton}>
          <SRIcon color="white" name={'home'} />
          <Text style={[rncStyles.textWhite]}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Restaurants')} style={SRStyles.navbarButton}>
          <SRIcon color="grey" name={'search'} />
          <Text style={[SRStyles.navbarText]}>Browse</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Cart')} style={SRStyles.navbarButton}>
          <SRIcon color="grey" name={'shopping-cart'} />
          <Text style={[SRStyles.navbarText]}>Cart</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Orders')} style={SRStyles.navbarButton}>
          <SRIcon color="grey" name={'list-alt'} />
          <Text style={[SRStyles.navbarText]}>Orders</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate('Account')} style={SRStyles.navbarButton}>
          <SRIcon color="grey" name={'person'} />
          <Text style={[SRStyles.navbarText]}>Account</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Home;
