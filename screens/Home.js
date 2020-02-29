import React from 'react';
import { StyleSheet, Dimensions, ScrollView, Alert } from 'react-native';
import { Block, theme } from 'galio-framework';

import { Card } from '../components';
import articles from '../constants/articles';
const { width } = Dimensions.get('screen');

class Home extends React.Component {
  async printThis(){
    let response = await fetch( "http://192.168.43.52/ReactTemplates/argon/PHP/getUsers.php");
    let responseJson = await response.json();
     // responseJson =  JSON.stringify(responseJson);
    console.log("Users : " + JSON.stringify(responseJson[1]['user_name']));
};
  renderArticles = (message) => {
   // setInterval(this.printThis, 5000);
    return (
        <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={styles.articles}>
          <Block flex>
            <Card item={articles[0]} horizontal/>
            <Block flex row>
              <Card item={articles[1]} style={{marginRight: theme.SIZES.BASE}}/>
              <Card item={articles[2]}/>
            </Block>
            <Card item={articles[3]} horizontal/>
            <Card item={articles[4]} full/>
          </Block>

        </ScrollView>
    );
  }

  render() {
    return (
      <Block flex center style={styles.home}>
        {this.renderArticles()}
      </Block>
    );
  }
}

const styles = StyleSheet.create({
  home: {
    width: width,    
  },
  articles: {
    width: width - theme.SIZES.BASE * 2,
    paddingVertical: theme.SIZES.BASE,
  },
});

export default Home;
