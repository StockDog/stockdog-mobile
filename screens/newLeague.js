import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import DatePicker from 'react-native-datepicker';
import { Actions } from 'react-native-router-flux';
import FormInput from '../components/formInput';
import WideButton from '../components/widebutton';
import Icon from 'react-native-vector-icons/Feather';
import styles from '../style/screens/newLeague';
import NavBar from '../components/navbar';
import { createLeague, joinLeague } from '../api';
import { updatePortfolios, chooseLeague } from '../actions/portfolioActions';

class NewLeague extends Component {
  constructor(props) {
    super(props);
    this.state = {
      leagueName: "",
      nickname: "",
      buyPower: "",
      startDate: "",
      endDate: "",
      minDate: "01-01-2001"
    };

  }

  componentDidMount() {
    this.setState({ minDate: this.getCurrDate() });
  }

  getCurrDate = () => {
    var today = new Date();
    var dd = today.getDate();
    var mm = today.getMonth() + 1; //January is 0!
    var yyyy = today.getFullYear();  // Last 2 digits of the date

    if (dd < 10) {
      dd = '0' + dd
    }

    if (mm < 10) {
      mm = '0' + mm
    }

    today = mm + '-' + dd + '-' + yyyy;
    return today;
  }

  validDates = (start, end) => {
    var startSplit = start.split('-').map(val => parseInt(val, 10));
    var endSplit = end.split('-').map(val => parseInt(val, 10));
    return new Date(startSplit[2], startSplit[0], startSplit[1]) < 
      new Date(endSplit[2], endSplit[0], endSplit[1]);
  }

  onSubmitLeague = async () => {
    if (/[a-zA-Z]/.test(this.state.buyPower)) {
      alert("Invalid Buying Power value. Please enter numbers only.");
    }
    else if (this.state.startDate && this.state.endDate && 
      !this.validDates(this.state.startDate, this.state.endDate)) { 
      alert("Invalid dates. Please make the end date later than the start date.");
    }
    else {
      const startPos = parseInt(this.state.buyPower);
      try {
        const createRes = await createLeague(this.state.leagueName, startPos,
          this.state.startDate, this.state.endDate);
        await joinLeague(createRes.data.inviteCode, this.state.nickname);
        await this.props.updatePortfolios();
        await this.props.chooseLeague(createRes.data.id);
        Actions.portfolioMain();
      }
      catch (err) {
        alert(Object.values(err.response.data[0]));
      }
    }
  }

  render() {
    var disabled = !(this.state.leagueName && this.state.nickname &&
      this.state.buyPower)

    return (
      <View style={styles.background}>
        <View style={styles.backgroundCircle} />
        <NavBar />
        <View style={styles.titleContainer}>
          <Text style={styles.title}> Create a League </Text>
        </View>
        <View style={styles.form}>
          <FormInput
            type="League Name"
            onchange={(leagueName) => this.setState({ leagueName })}
            value={this.state.leagueName} />
          <FormInput
            type="Your Nickname"
            onchange={(nickname) => this.setState({ nickname })}
            value={this.state.nickname} />
          <FormInput
            type="Buying Power"
            onchange={(buyPower) => this.setState({ buyPower })}
            value={this.state.buyPower} />
          <DatePicker
            date={this.state.startDate}
            mode="date"
            style={styles.datepicker}
            placeholder="Select start date"
            format="MM-DD-YYYY"
            minDate={this.state.minDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              placeholderText: styles.datePlaceholderText,
              dateInput: styles.dateInput,
              dateText: styles.dateText
            }}
            iconComponent={<Icon name='calendar' size={30} color='grey' />}
            onDateChange={(startDate) => { this.setState({ startDate }) }}
          />
          <DatePicker
            date={this.state.endDate}
            mode="date"
            style={styles.datepicker}
            placeholder="Select end date"
            format="MM-DD-YYYY"
            minDate={this.state.minDate}
            confirmBtnText="Confirm"
            cancelBtnText="Cancel"
            customStyles={{
              placeholderText: styles.datePlaceholderText,
              dateInput: styles.dateInput,
              dateText: styles.dateText
            }}
            iconComponent={<Icon name='calendar' size={36} color='grey' />}
            onDateChange={(endDate) => { this.setState({ endDate }) }}
          /> 
        </View>
        <View style={styles.formBuffer}/>
        <View style={styles.submitButton}>
          <WideButton disabled={disabled} type="addLeague" onpress={this.onSubmitLeague} />
        </View>
      </View>
    );
  }
};

export default connect(null, { updatePortfolios, chooseLeague })(NewLeague);