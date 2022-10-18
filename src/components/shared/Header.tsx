import { Box, Button } from "@chakra-ui/react";
import { chakra } from "@chakra-ui/system";
import { SearchIcon } from "@chakra-ui/icons";
import { css, StyleSheet } from "aphrodite";
import { useEffect, useState } from "react";
import { MOBILE_QUERY } from "../constants/mediaQuery";
import debouncing from "../utils/debounce";

interface HeaderProps {
  setGetSearchQuery: any;
}

const Header: React.FC<HeaderProps> = ({ setGetSearchQuery }) => {
  const [query, setQuery] = useState("");
  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const optimizedFn = debouncing((e) => {
    handleChange(e);
  }, 300);

  useEffect(() => {
    setGetSearchQuery(query);
  }, [query]);

  return (
    <chakra.header minH={"70px"} h={"35px"} className={css(styles.container)}>
      <Box className={css(styles.wrapper)} h={"100%"} w={"100%"}>
        <chakra.img
          w={"40px"}
          height={"40px"}
          src="https://raw.githubusercontent.com/storyofcoder/extraImages/master/brain.png"
        ></chakra.img>
        <Box className={css(styles.searchBox)}>
          <Button
            className={css(styles.searchIcon)}
            variant="outline_black"
            size={"md"}
            leftIcon={<SearchIcon boxSize="1.2rem" />}
          ></Button>
          <chakra.input
            className={css(styles.searchBar) + " header-search-bar"}
            type={"text"}
            placeholder={"Search Username... "}
            onChange={optimizedFn}
          ></chakra.input>
        </Box>
      </Box>
    </chakra.header>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "7px 35px",
    [MOBILE_QUERY]: {
      padding: "7px 22px",
    },
  },
  loginBtn: {
    borderRadius: "9999px",
    fontWeight: 500,
  },
  searchBox: {
    width: "450px",
    height: "100%",
    margin: "auto",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    [MOBILE_QUERY]: {
      width: "250px",
    },
  },
  container: {
    boxShadow: "0 4px 12px 0 rgb(0 0 0 / 5%)",
    backgroundColor: "#fff",
  },
  searchIcon: {
    borderRadius: "15px 0 0 15px",
    backgroundColor: "#f5f5f6",
  },
  searchBar: {
    display: "inline-block",
    fontSize: "14px",
    height: "40px",
    lineHeight: "24px",
    width: "100%",
    padding: "8px 10px 10px",
    border: "1px solid #f5f5f6",
    borderRadius: "0 15px 15px 0",
    backgroundColor: "#f5f5f6",
    ":focus": {
      backgroundColor: "#fff",
      borderColor: "#eaeaec",
    },
  },
});

export default Header;
