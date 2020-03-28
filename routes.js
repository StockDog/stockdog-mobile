import React from "react";
import { Scene, Tabs, Modal, Drawer, Lightbox } from "react-native-router-flux";
import { Provider } from "react-redux";
import { AppearanceProvider } from 'react-native-appearance';

import { PersistGate } from "redux-persist/integration/react";
import Login from "./screens/login";
import Portfolio from "./screens/portfolio";
import Stock from "./screens/stock";
import League from "./screens/league";
import AddMemberModal from "./screens/addMemberModal";
// import Feed from './screens/feed';
import NoLeagues from "./screens/noLeagues";
import JoinLeague from "./screens/joinLeague";
import NewLeague from "./screens/newLeague";
import TradingModal from "./screens/tradingModal";
import Search from "./screens/search";
import LeagueDrawer from "./screens/leagueDrawer";

import CustomRouter from "./components/customRouter";
import TabIcon from "./components/tabIcon";
import LoadingPortfolio from "./components/loadingPortfolio";

import colors from "./style/colors";
import tabStyle from "./style/components/tabBar";
import configureStore from "./store/store";

const { store, persistor } = configureStore();

const Routes = () => (
  <AppearanceProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <CustomRouter>
          <Scene key="root" hideNavBar gesturesEnabled={false}>
            <Scene key="login" component={Login} />
            <Scene key="loading" component={LoadingPortfolio} />
            <Drawer key="drawer" contentComponent={LeagueDrawer} type="replace">
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
                <Scene
                  key="portfolioMain"
                  hideNavBar
                  title="Portfolio"
                  iconName="user"
                  icon={TabIcon}
                >
                  <Scene
                    key="portfolio"
                    component={Portfolio}
                    onEnter={Portfolio.onEnterPortfolio}
                  />
                </Scene>
                <Scene
                  key="leagueMain"
                  hideNavBar
                  title="League"
                  iconName="users"
                  icon={TabIcon}
                  onEnter={League.onEnterLeague}
                >
                  <Lightbox>
                    <Scene key="league" component={League} />
                    <Scene
                      key="addMemberModal"
                      component={AddMemberModal}
                      swipeDownToClose
                    />
                  </Lightbox>
                </Scene>

                <Scene
                  key="searchMain"
                  hideNavBar
                  title="Stock"
                  iconName="search"
                  icon={TabIcon}
                  duration={0}
                >
                  <Scene key="search" component={Search} />
                  <Lightbox duration={0}>
                    <Scene
                      key="stock"
                      component={Stock}
                      hideNavBar
                      swipeDownToClose={false} 
                      duration={0}
                    />
                    <Scene
                      key="tradingModal"
                      component={TradingModal}
                      swipeDownToClose
                      duration={0}
                    />
                  </Lightbox>
                </Scene>
              </Tabs>
            </Drawer>
          </Scene>
        </CustomRouter>
      </PersistGate>
    </Provider>
  </AppearanceProvider>
);

export default Routes;
