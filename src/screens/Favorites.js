import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {GLOBALSTYLE, COLORS} from '../constants/Theme';
import {useSelector, useDispatch} from 'react-redux';
import {removeFavorite} from '../redux/features/popularMovies/popularMoviesSlice';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const Favorites = () => {
  const popularMovies = useSelector(state => state.popularMovies);
  const dispatch = useDispatch();

  console.log('Fav move', popularMovies);

  const removeFromFavorites = movie => dispatch(removeFavorite(movie));
  const handleRemoveFavorite = movie => {
    removeFromFavorites(movie);
  };

  const renderItemView = ({item}) => {
    const IMAGE_URL = 'https://image.tmdb.org/t/p/w185' + item.poster_path;
    return (
      <View style={styles.cardContainerStyle}>
        <View style={styles.cardStyle}>
          <Image
            source={{uri: IMAGE_URL}}
            resizeMode="cover"
            style={styles.imageStyle}
          />
          <View style={{justifyContent: 'flex-start'}}>
            <View style={styles.cardInfoContainerStyle}>
              <Text style={styles.cardHeadingStyle}>{item.title}</Text>
            </View>
            <View style={styles.iconContainerStyle}>
              <MaterialIcons
                name="thumb-up"
                size={32}
                color={COLORS.greenPrimary}
              />
              <Text style={{marginLeft: 10}}>{item.vote_count}</Text>
              <TouchableOpacity
                onPress={() => handleRemoveFavorite(item)}
                style={styles.favIconStyle}>
                <MaterialIcons name="favorite" size={32} color="orange" />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView style={[GLOBALSTYLE.containerStyle, {padding: 10}]}>
      {popularMovies.loading && (
        <View style={GLOBALSTYLE.rootContainerStyle}>
          <ActivityIndicator size="large" color={COLORS.bluePrimary} />
        </View>
      )}
      {!popularMovies.loading && popularMovies.error ? (
        <View style={GLOBALSTYLE.rootContainerStyle}>
          <Text style={GLOBALSTYLE.errorTextStyle}>
            Error : {popularMovies.error}
          </Text>
        </View>
      ) : null}
      {!popularMovies.loading && popularMovies.favorites.length >= 1 ? (
        <View style={GLOBALSTYLE.containerStyle}>
          <Text style={GLOBALSTYLE.headingStyle}>Favorite Movies</Text>
          <FlatList
            data={popularMovies.favorites}
            renderItem={renderItemView}
            keyExtractor={(item, idx) => idx.toString()}
            showsVerticalScrollIndicator={false}
          />
        </View>
      ) : (
        <View style={GLOBALSTYLE.rootContainerStyle}>
          <Text style={GLOBALSTYLE.errorTextStyle}>
            {`Favorite Movies Data Not Found, \nAdd a movie to the list.`}
          </Text>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Favorites;

const styles = StyleSheet.create({
  cardContainerStyle: {
    marginVertical: 12,
  },
  cardStyle: {
    flex: 1,
    flexDirection: 'row',
  },
  imageStyle: {
    width: 100,
    height: 150,
    borderRadius: 10,
  },
  cardInfoContainerStyle: {
    marginLeft: 12,
    flexWrap: 'wrap',
  },
  cardHeadingStyle: {
    paddingRight: 16,
    fontSize: 18,
    fontWeight: 'bold',
  },
  iconContainerStyle: {
    marginTop: 10,
    marginLeft: 13,
    alignItems: 'center',
    flexDirection: 'row',
  },
  countTextStyle: {
    paddingLeft: 10,
    fontSize: 18,
    color: '#64676D',
  },
  favIconStyle: {
    width: 40,
    height: 40,
    padding: 2,
    borderRadius: 20,
    marginLeft: 14,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
});
