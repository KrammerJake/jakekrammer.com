import { Box, Link } from "@chakra-ui/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

const Sidebar = () => {
  const history = useHistory();
  useEffect(() => {
    console.log(
      "history.location.pathname changed = ",
      history.location.pathname
    );
  }, [history.location.pathname]);
  return (
    <Box
      display="flex"
      flexDir="column"
      margin={5}
      borderRadius={15}
      padding={5}
      fontSize={20}
      maxW="200px"
      w="20%"
      h="100vh"
      color="black"
      bgColor="white"
      border="1px solid"
    >
      <Link onClick={() => history.push("/")}>Home</Link>
      <Link onClick={() => history.push("/resume")}>Resume</Link>
      <Link isTruncated onClick={() => history.push("/test")}>
        Really long name that is too long
      </Link>
    </Box>
  );
};

export default Sidebar;
