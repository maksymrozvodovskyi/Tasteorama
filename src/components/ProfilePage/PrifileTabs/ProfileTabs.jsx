import { useParams, useNavigate, Navigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import "react-tabs/style/react-tabs.css";

import MyRecipesList from "../MyRecipesList/MyRecipesList.jsx";
import FavoritesList from "../FavoritesList/FavoritesList.jsx";

import styles from "./ProfileTabs.module.css";

const ProfileTabs = () => {
  const { recipeType } = useParams();

  const navigate = useNavigate();

  const tabRoutes = ["own", "favorites"];
  const selectedIndex = tabRoutes.indexOf(recipeType);

  const handleSelect = (index) => {
    navigate(`/profile/${tabRoutes[index]}`);
  };

  if (!tabRoutes.includes(recipeType))
    return <Navigate to={`/${tabRoutes[0]}`} replace />;

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Profile</h1>

      <Tabs selectedIndex={selectedIndex} onSelect={handleSelect}>
        <TabList className={styles.tabList}>
          <Tab className={styles.tab} selectedClassName={styles.selectedTab}>
            My Recipes
          </Tab>
          <Tab className={styles.tab} selectedClassName={styles.selectedTab}>
            Saved Recipes
          </Tab>
        </TabList>

        <TabPanel>
          <MyRecipesList />
        </TabPanel>
        <TabPanel>
          <FavoritesList />
        </TabPanel>
      </Tabs>
    </div>
  );
};

export default ProfileTabs;
