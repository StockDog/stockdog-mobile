import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import styles from '../style/screens/league';

export default class RankingList extends Component {
  keyExtractor = (item, index) => index.toString();

  renderRankingRow = (item) => (
    <View style={styles.horizontalItem}>
      <Text style={styles.listText}>
        {`${item.index + 1}. ${item.item.name}`}
      </Text>
      <Text style={styles.listText}>
        {`$${item.item.value}`}
      </Text>
    </View>
  )

  render() {
    const { members } = this.props;

    return (
      <View style={styles.ratingsList}>
        <View style={styles.smallHeaderView}>
          <Text style={styles.smallHeader}> Player </Text>
          <Text style={styles.smallHeader}> Worth</Text>
        </View>
        <FlatList
          keyExtractor={this.keyExtractor}
          data={members}
          renderItem={this.renderRankingRow}
        />
      </View>
    );
  }
}
