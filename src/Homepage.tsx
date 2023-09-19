/* eslint-disable react-native/no-inline-styles */
import {
  Text,
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {useNavigation} from '@react-navigation/native';

import NavBar from './NavBar';
import {API_KEY} from './Constants';
import {fetchNews} from './helpers/api-helper';
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
  const [News, setNews] = useState([]);
  const [active, setActive] = useState(1);
  const [isLoading, setLoading] = useState(true);

  const navigation = useNavigation();

  const handelOptionPress = (id: number, apiUrl: string) => {
    setActive(id);
    fetchNewsByCategory(apiUrl);
  };

  const fetchNewsByCategory = (apiUrl: string) => {
    setLoading(true);
    fetchNews(apiUrl)
      .then((articles) => {
        setNews(articles);
      })
      .catch((error) => {
        console.error(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  useEffect(() => {
    fetchNewsByCategory(option[0].apiUrl);
  }, []);

  const handelNavigation = (news) => {
    navigation.navigate('Detail', {
      content: news,
      title: news.title,
    });
  };
  return (
    <View style={styles.container}>
      <NavBar />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View style={styles.optionContainer}>
          {option.map((optionItem) => (
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

      {isLoading ? (
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
                onPress={() => handelNavigation(news)}>
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
    gap: 20,
    marginTop: 20,
    marginBottom: 20,
    flexDirection: 'row',
  },
  optionItem: {
    alignItems: 'center',
  },
  optionText: {
    height: 40,
    fontSize: 20,
    borderRadius: 10,
    paddingVertical: 6,
    paddingHorizontal: 10,
  },
  newsContainer: {
    marginTop: 10,
    marginBottom: 120,
  },
  newsItem: {
    margin: 5,
    padding: 5,
    borderWidth: 1,
    borderRadius: 10,
    borderColor: 'black',
  },
  newsTitle: {
    fontSize: 16,
  },
  loadingContainer: {
    flex: 1,
    marginTop: 280,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
