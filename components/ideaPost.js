import React, { Component } from 'react';
import { TouchableOpacity, View, Text } from 'react-native';
import styles from '../style/screens/feed';

export default class IdeaPost extends Component {
  createComments = (post) => post.comments.map((comment, index) => (
    // eslint-disable-next-line react/no-array-index-key
    <View key={index} style={styles.commentContainer}>
      <Text style={styles.commentContent}>
        <Text style={styles.commentTitle}>
          {comment.username}
        </Text>
        {` ${comment.comment}`}
      </Text>
    </View>
  ))

  render() {
    const { post } = this.props;
    const comments = this.createComments(post);

    return (
      <View style={styles.activityPost}>
        <Text style={styles.miniText}>{post.date}</Text>
        <View style={styles.ideaPostTitleContainer}>
          <Text>
            <Text style={styles.postTitle}>{post.username}</Text>
            <Text style={styles.ideaText}>
              {' '}
              {post.idea}
            </Text>
          </Text>
        </View>
        {comments}
        <TouchableOpacity style={styles.replyButtonContainer}>
          <Text style={styles.replyButtonText}>
            Reply
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}
