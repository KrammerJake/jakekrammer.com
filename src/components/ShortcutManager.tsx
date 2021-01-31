import { useColorMode } from "@chakra-ui/react";
import { useEffect } from "react";
import Mousetrap from "mousetrap";

const ShortcutManager = () => {
  const { colorMode, toggleColorMode } = useColorMode();

  useEffect(() => {
    Mousetrap.bind("t", () => toggleColorMode());

    return () => {
      Mousetrap.unbind("t");
    };
  }, [colorMode, toggleColorMode]);

  return null;
};

export default ShortcutManager;
