import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { Actions } from 'react-native-router-flux';
import { Feather } from '@expo/vector-icons';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import styles from '../style/screens/newLeague';
import NavBar from '../components/navbar';
import { createLeague, joinLeague } from '../api';
import { updatePortfolios, chooseLeague } from '../actions/portfolioActions';

class NewLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueName: '',
      nickname: '',
      buyPower: '',
      startDate: '',
      endDate: '',
      minDate: '01-01-2001',
    };
  }

  componentDidMount() {
    this.setState({ minDate: this.getCurrDate() });
  }

  getCurrDate = () => {
    let today = new Date();
    let dd = today.getDate();
    let mm = today.getMonth() + 1; // January is 0!
    const yyyy = today.getFullYear(); // Last 2 digits of the date

    if (dd < 10) {
      dd = `0${dd}`;
    }

    if (mm < 10) {
      mm = `0${mm}`;
    }

    today = `${mm}-${dd}-${yyyy}`;
    return today;
  };

  validDates = (start, end) => {
    const startSplit = start.split('-').map((val) => parseInt(val, 10));
    const endSplit = end.split('-').map((val) => parseInt(val, 10));
    return (
      new Date(startSplit[2], startSplit[0], startSplit[1])
      < new Date(endSplit[2], endSplit[0], endSplit[1])
    );
  };

  onSubmitLeague = async () => {
    const { update, choose } = this.props;
    const {
      buyPower, startDate, endDate, leagueName, nickname,
    } = this.state;
    if (/[a-zA-Z]/.test(buyPower)) {
      alert('Invalid Buying Power value. Please enter numbers only.');
    } else if (startDate && endDate && !this.validDates(startDate, endDate)) {
      alert(
        'Invalid dates. Please make the end date later than the start date.',
      );
    } else {
      const startPos = parseInt(buyPower, 10);
      try {
        const createRes = await createLeague(
          leagueName,
          startPos,
          startDate,
          endDate,
        );
        await joinLeague(createRes.data.inviteCode, nickname);
        await update();
        await choose(createRes.data.id);
        Actions.portfolioMain();
      } catch (err) {
        alert(Object.values(err.response.data[0]));
      }
    }
  };

  render() {
    const {
      leagueName,
      nickname,
      buyPower,
      minDate,
      endDate,
      startDate,
    } = this.state;
    const disabled = !(leagueName && nickname && buyPower);

    return (
      <KeyboardAwareScrollView
        resetScrollToCoords={{ x: 0, y: 0 }}
        contentContainerStyle={styles.background}
        scrollEnabled={false}
        keyboardShouldPersistTaps="handled"
      >
        <View style={styles.backgroundCircle} />
        <NavBar />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Create a League </Text>
        </View>
        <View style={styles.form}>
          <FormInput
            type="League Name"
            onchange={(leagueChange) => this.setState({ leagueName: leagueChange })}
            value={leagueName}
          />
          <FormInput
            type="Your Nickname"
            onchange={(newNickname) => this.setState({ nickname: newNickname })}
            value={nickname}
          />
          <FormInput
            type="Buying Power"
            onchange={(newBP) => this.setState({ buyPower: newBP })}
            value={buyPower}
          />
          <DatePicker
            date={startDate}
            mode="date"
            style={styles.datepicker}
            placeholder="Select start date"
            format="MM-DD-YYYY"
            minDate={minDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              placeholderText: styles.datePlaceholderText,
              dateInput: styles.dateInput,
              dateText: styles.dateText,
              datePickerCon: {
                backgroundColor: 'white',
              },
            }}
            iconComponent={<Feather name="calendar" size={30} color="grey" />}
            onDateChange={(newDate) => {
              this.setState({ startDate: newDate });
            }}
            textColor="#ffffff"
          />
          <DatePicker
            date={endDate}
            mode="date"
            style={styles.datepicker}
            placeholder="Select end date"
            format="MM-DD-YYYY"
            minDate={minDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              placeholderText: styles.datePlaceholderText,
              dateInput: styles.dateInput,
              dateText: styles.dateText,
              datePickerCon: {
                backgroundColor: 'white',
              },
            }}
            iconComponent={<Feather name="calendar" size={30} color="grey" />}
            onDateChange={(newDate) => {
              this.setState({ endDate: newDate });
            }}
          />
        </View>
        <View style={styles.formBuffer} />
        <View style={styles.submitButton}>
          <WideButton
            disabled={disabled}
            type="addLeague"
            onpress={this.onSubmitLeague}
          />
          <WideButton type="cancel" onpress={Actions.pop} />
        </View>
      </KeyboardAwareScrollView>
    );
  }
}

export default connect(null, {
  update: updatePortfolios,
  choose: chooseLeague,
})(NewLeague);
