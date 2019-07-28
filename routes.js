import React from 'react';
import { Scene, Tabs, Modal, Drawer, Lightbox } from 'react-native-router-flux';
import { Provider } from 'react-redux';
import CustomRouter from './components/customRouter';
import Login from './screens/login';
import Register from './screens/register';
import Portfolio from './screens/portfolio';
import Stock from './screens/stock';
import League from './screens/league';
import Feed from './screens/feed';
import NoLeagues from './screens/noLeagues';
import JoinLeague from './screens/joinLeague';
import NewLeague from './screens/newLeague';
import TradingModal from './screens/tradingModal';
import Search from './screens/search';
import LeagueDrawer from './screens/leagueDrawer';
import TabIcon from './components/tabIcon';
import colors from './style/colors';
import tabStyle from './style/components/tabBar';
import store from './store/store';

const Routes = () => (
  <Provider store={store}>
    <CustomRouter>
      <Scene key="root" hideNavBar>
        <Scene key="login" component={Login} />
        <Scene key="register" component={Register} />
        <Drawer
          key="drawer"
          contentComponent={LeagueDrawer}
          type="replace"
        >
          <Modal key="leagueManagement" hideNavBar> 
            <Scene key="noLeagues" hideNavBar component={NoLeagues} />
            <Scene key="newLeague" hideNavBar component={NewLeague} />
            <Scene key="joinLeague" hideNavBar component={JoinLeague} />
          </Modal>
          <Tabs
            key="main"
            tabBarStyle={tabStyle.tabBar}
            tabStyle={tabStyle.tabStyle}
            tabBarPosition="bottom"
            activeTintColor={colors.white}
            inactiveTintColor={colors.white}
            inactiveBackgroundColor={colors.grey}
            activeBackgroundColor={colors.activeTab}
            labelStyle={tabStyle.tabLabel}
          >
            <Scene key="portfolioMain" hideNavBar title="Portfolio" iconName="user" icon={TabIcon}>
              <Scene key="portfolio" component={Portfolio} onEnter={Portfolio.onEnterPortfolio} />
            </Scene>
            <Scene key="league" title="League" component={League} hideNavBar iconName="users" icon={TabIcon} onEnter={League.onEnterLeague} />
            <Scene key="feed" title="Feed" component={Feed} hideNavBar iconName="activity" icon={TabIcon} onEnter={Feed.onEnterFeed} />
            <Scene key="searchMain" hideNavBar title="Search" iconName="search" icon={TabIcon}>
              <Scene key="search" component={Search} />
              <Scene key="stock" component={Stock} hideNavBar swipeDownToClose={false} />
            </Scene>
          </Tabs>

          <Lightbox key="stock">
            <Scene key="stockPage" component={Stock} hideNavBar swipeDownToClose={false} />
            <Scene key="tradingModal" component={TradingModal} swipeDownToClose />
          </Lightbox>
        </Drawer>
      </Scene>
    </CustomRouter>
  </Provider>
);
    
export default Routes;
