/* eslint-disable react-native/no-inline-styles */
import axios from 'axios';
import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';

import NavBar from './NavBar';
import {API_KEY} from './Constants';

const option = [
  {
    id: 1,
    name: 'For You',
    apiUrl: `https://newsapi.org/v2/top-headlines?country=us&apiKey=${API_KEY}`,
  },
  {
    id: 2,
    name: 'Business',
    apiUrl: `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${API_KEY}`,
  },
  {
    id: 3,
    name: 'Sports',
    apiUrl: `https://newsapi.org/v2/top-headlines?country=us&category=sports&apiKey=${API_KEY}`,
  },
  {
    id: 4,
    name: 'Politics',
    apiUrl: `https://newsapi.org/v2/top-headlines?country=us&category=politics&apiKey=${API_KEY}`,
  },
  {
    id: 5,
    name: 'Tech',
    apiUrl: `https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${API_KEY}`,
  },
];

export default function Homepage() {
  const [active, setActive] = useState(1);
  const [News, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigation = useNavigation();

  const handelOptionPress = (id: number, apiUrl: string) => {
    setActive(id);
    fetchNewsByCategory(apiUrl);
  };

  const fetchNewsByCategory = (apiUrl: string) => {
    setLoading(true);
    axios
      .get(apiUrl)
      .then(res => {
        setNews(res.data.articles);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNewsByCategory(option[0].apiUrl);
  }, []);
  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.optionContainer}>
          {option.map(optionItem => (
            <TouchableOpacity
              key={optionItem.id}
              onPress={() =>
                handelOptionPress(optionItem.id, optionItem.apiUrl)
              }
              style={styles.optionItem}>
              <Text
                style={[
                  styles.optionText,
                  {
                    backgroundColor: active === optionItem.id ? 'black' : null,
                    color: active === optionItem.id ? 'white' : 'gray',
                  },
                ]}>
                {optionItem.name}
              </Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
      {loading ? ( // Display the loading indicator if loading is true
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="blue" />
        </View>
      ) : (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View style={styles.newsContainer}>
            {News.map((news, index) => (
              <TouchableOpacity
                key={index.toString()}
                style={styles.newsItem}
                onPress={() =>
                  navigation.navigate('Detail', {
                    title: news.title,
                    content: news,
                  })
                }>
                <Text style={styles.newsTitle}>{news.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 15,
  },
  optionContainer: {
    flexDirection: 'row',
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  optionItem: {
    alignItems: 'center',
  },
  optionText: {
    fontSize: 20,
    height: 40,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 10,
  },
  newsContainer: {
    marginTop: 10,
    marginBottom: 120,
  },
  newsItem: {
    borderWidth: 1,
    borderColor: 'black',
    margin: 5,
    padding: 5,
    borderRadius: 10,
  },
  newsTitle: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 280,
  },
});
