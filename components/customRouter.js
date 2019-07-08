import React, { Component } from 'react';
import { Router, Reducer } from 'react-native-router-flux';
import { connect } from 'react-redux';

class CustomRouter extends Component {
  routerReducer = (params) => {
    const defaultReducer = new Reducer(params);
    const { dispatch } = this.props;
    return (state, action) => {
      dispatch(action);
      return defaultReducer(state, action);
    };
  }

  render = () => {
    const { children } = this.props;
    return (
      <Router createReducer={this.routerReducer}>
        {children}
      </Router>
    );
  }
}

export default connect()(CustomRouter);
