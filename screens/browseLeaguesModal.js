import React, { useState, useEffect } from 'react';
import {
  Modal, View, FlatList, Text, TouchableOpacity,
} from 'react-native';
import { connect } from 'react-redux';
import styles from '../style/components/browseLeagueModal';
import WideButton from '../components/widebutton';
import { getLeagues } from '../api';

const BrowseLeagueModal = ({
  isOpen, toggle, fillInviteCode, portfolios,
}) => {
  const [leagues, setLeagues] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      const res = await getLeagues();
      const userInLeagueIds = Object.keys(portfolios);

      // Remove leagues that the user is already in
      const filteredLeagues = res.data.filter(
        (league) => !userInLeagueIds.includes(`${league.id}`),
      );

      setLeagues(filteredLeagues);
    };

    fetchData();
  }, []);

  return (
    <View>
      <Modal visible={isOpen} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modal}>
            <FlatList
              style={styles.leagueList}
              data={leagues}
              renderItem={({ item }) => (
                <LeagueListItem
                  name={item.name}
                  startPos={item.startPos}
                  start={item.start}
                  end={item.end}
                  inviteCode={item.inviteCode}
                  closeModal={toggle}
                  fillInviteCode={fillInviteCode}
                />
              )}
              ItemSeparatorComponent={() => <LeagueListSeparator />}
              keyExtractor={(item) => item.id}
            />
            <View style={styles.cancelBtn}>
              <WideButton type="darkCancel" onpress={toggle} />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const LeagueListItem = ({
  name,
  startPos,
  start,
  end,
  inviteCode,
  closeModal,
  fillInviteCode,
}) => (
  <TouchableOpacity
    style={styles.listLeagueItem}
    onPress={() => {
      fillInviteCode(inviteCode);
      closeModal();
    }}
  >
    <Text style={styles.listTitle}>{name}</Text>
    <Text style={styles.listDetails}>
$
      {startPos}
    </Text>
    <Text style={styles.listDetails}>
      Start Date:
      {start}
    </Text>
    <Text style={styles.listDetails}>
      End Date:
      {end}
    </Text>
  </TouchableOpacity>
);

const LeagueListSeparator = () => <View style={styles.listLeagueSeparator} />;

const mapStateToProps = (state) => ({
  portfolios: state.portfolioAndLeague.portfolios,
});

export default connect(mapStateToProps, null)(BrowseLeagueModal);
