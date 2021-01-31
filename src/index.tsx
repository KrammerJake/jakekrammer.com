import { Box, ChakraProvider, Flex } from "@chakra-ui/react";
import React from "react";
import ReactDOM from "react-dom";

import Resume from "./components/Resume";
import ShortcutManager from "./components/ShortcutManager";
import Sidebar from "./components/Sidebar";

import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

const App = () => {
  return (
    <React.StrictMode>
      <ChakraProvider>
        <ShortcutManager />
        <Box bgColor="gray.400" overflow="auto">
          <Router>
            <Flex>
              <Sidebar />
              <Switch>
                <Route exact path="/resume" component={Resume} />
                <Route path="/">
                  <h1>Hello world</h1>
                </Route>
              </Switch>
            </Flex>
          </Router>
        </Box>
      </ChakraProvider>
    </React.StrictMode>
  );
};

ReactDOM.render(<App />, document.getElementById("root"));
