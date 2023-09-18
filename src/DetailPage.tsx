import React from 'react';
import {Image, Text, View, StyleSheet} from 'react-native';

import NavBar from './NavBar';
import Data from './Data';
import {ScrollView} from 'react-native-gesture-handler';

export default function DetailPage({route}) {
  const {title, content} = route.params;
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit' };
    return new Date(dateString).toLocaleDateString('en-US', options);
  };

  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView
        showsHorizontalScrollIndicator={false}
        showsVerticalScrollIndicator={false}>
        <View style={styles.imageContainer}>
          <Image source={{uri: content.urlToImage}} style={styles.image} />
        </View>
        <Text style={styles.title}>{title}</Text>
        <Data value={formatDate(content.publishedAt)} title="PublishedAt" />
        <Data value={content.author} title="Author" />
        <Data value={content.description} title="Description" />
        <Data value={content.content} title="Content" />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  imageContainer: {
    marginTop: 20,
  },
  image: {
    height: 250,
    borderRadius: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
    color: 'black',
  },
});
