import React, { Component } from 'react';
import { StyleSheet, Text, View, PixelRatio } from 'react-native';
import { colors } from './colors.js'; 

export default containers = StyleSheet.create({
    general: {
      flex: 1,
      backgroundColor: colors.dark,
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: 0
    },
    horizontal: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      marginLeft: 30
    },
    tabBar: {
      borderTopColor: '#657a86',
      borderTopWidth: 1 / PixelRatio.get()
    },
    profileGeneral: {
      flex: 1,
      backgroundColor: colors.dark,
      justifyContent: 'flex-start',
      paddingTop: 0
    },
    chart: {
      flex: 0.7,
      alignItems: 'center',
      justifyContent: 'flex-start',
      marginTop: -10
    },
    chartOut: {
      flex: 0.5,
      alignItems: 'center',
      justifyContent: 'flex-start'
    },
    iconHeaders: {
      flex: 0.1,
      flexDirection: 'row',
      alignItems: 'flex-end',
      justifyContent: 'space-between',
      paddingLeft: 10,
      paddingRight: 10,
      paddingTop: 5
    },
    underChart: {
      flex: 0.2,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      marginTop: -50
    },
    buttons: {
      flex: 0.5,
      flexDirection: 'row',
      justifyContent: 'space-around'
    },
    modalHeaders: {
      flex: 0.3,
      width: '70%',
      alignItems: 'flex-end',
      justifyContent: 'center'
    },
    innerModal: {
      flex: 0.9,
      justifyContent: 'flex-start',
      alignItems: 'center',
    },
    outerModal: {
      // flex: 0.6,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.grey
    },
    successMessage: {
      width: 250, 
      height: '70%', 
      alignItems: 'center', 
      justifyContent: 'center'
    },
    profileChart: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center'
    },
    portfolioItem: {
      flexDirection: 'row', 
      justifyContent: 'space-between', 
      alignItems: 'center',
      borderStyle: 'solid', 
      borderColor: colors.white, 
      borderWidth: 2
    },
    groupsDrawer: {
      flex: 1,
      flexDirection: 'column',
      backgroundColor: colors.white,
      alignItems: 'center',
      justifyContent: 'space-between',
      paddingTop: 30
    },
    leaguesList: {
      flex: 1,
      paddingTop: 20,
      width: '100%',
      borderBottomWidth: 1
    },
    leaguesFooter: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingBottom: 10,
      marginTop: 10,
    },
    groupItem: {
      borderStyle: 'solid', 
      borderColor: colors.grey, 
      borderWidth: 2
    },
    addGroupModalHeader: {
      flex: 0.2,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center'
    },
    addGroupInnerModal: {
      flex: 1,
      justifyContent: 'flex-start',
      alignItems: 'center',
      paddingTop: 10
    },
    addGroupOuterModal: {
      flex: 1,
      width: '80%',
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      backgroundColor: colors.grey
    },
    leagueName: {
      flex: 0.3,
      flexDirection: 'column',
      justifyContent: 'flex-start',
      alignItems: 'center',
      //backgroundColor: 'pink',
      paddingTop: 20,
      marginTop: 10
    },
    leagueMembers: {
      flex: 0.8,
      //backgroundColor: 'pink',
      flexDirection: 'column',
      //alignItems: 'center',
      paddingTop: 50,
      paddingLeft: 30,
      paddingRight: 30,
      //borderColor: colors.white,
      //borderWidth: 3
    },
    memberRow: {
      flexDirection: 'row',
      borderBottomWidth: 1,
      borderColor: "gray"
      //backgroundColor: 'green'
    },
    membersName: {
      justifyContent: 'space-between',
      alignItems: 'flex-start',
      //backgroundColor: 'blue',
      flex: 0.8,
      //flexDirection: 'row'
    },
    membersRank: {
      flex: 0.2,
      alignItems: 'flex-end'
    },
    code: {
      flex: 0.5,
      padding:10
      //backgroundColor: 'gray'
    }
});