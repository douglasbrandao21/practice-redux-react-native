import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login/Login";
import Repositories from "./pages/Repositories/Repositories";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login,
    Repositories
  })
);

export default Routes;
