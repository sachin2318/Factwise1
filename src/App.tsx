import { css, StyleSheet } from "aphrodite";
import "./App.css";
import MainLayout from "./components/common/Mainlayout";
import fakeData from "./components/fakeData/fakeData.json";
import { Stack, Accordion, Skeleton } from "@chakra-ui/react";
import UserAccordion from "./components/shared/UserAccordion";
import { MOBILE_QUERY } from "./components/constants/mediaQuery";
import { useEffect, useState } from "react";

interface userType {
  id: number;
  first: string;
  last: string;
  dob: string;
  gender: string;
  email: string;
  picture: string;
  country: string;
  description: string;
}
function App() {
  const [allowToggle, setAllowToggle] = useState(true);
  const [editableId, setEditableId] = useState("");
  const [userData, setUserData] = useState<userType[]>([]);
  const [updateData, setUpdateData] = useState(false);
  const [getSearchQuery, setGetSearchQuery] = useState("");
  useEffect(() => {
    if (!localStorage.getItem("fakeUserData")) {
      localStorage.setItem("fakeUserData", JSON.stringify(fakeData));
      setUserData(fakeData);
    } else {
      let data = localStorage.getItem("fakeUserData");
      let ary = JSON.parse(data as any);
      setUserData(ary);
    }
  }, []);

  useEffect(() => {
    if (updateData) {
      let data = localStorage.getItem("fakeUserData");
      let ary = JSON.parse(data as any);
      setUserData(ary);
      setUpdateData(false);
    }
  }, [updateData]);

  useEffect(() => {
    if (getSearchQuery.length) {
      let data = localStorage.getItem("fakeUserData");
      let ary = JSON.parse(data as any);
      let output = ary.filter((e) => {
        let uName = e.first.concat(e.last).toUpperCase();
        let lName = e.first.concat(e.last).toLowerCase();
        if (uName.includes(getSearchQuery) || lName.includes(getSearchQuery)) {
          return e;
        }
      });
      setUserData(output);
    } else {
      let data = localStorage.getItem("fakeUserData");
      let ary = JSON.parse(data as any);
      setUserData(ary);
    }
  }, [getSearchQuery]);
  return (
    <MainLayout setGetSearchQuery={setGetSearchQuery}>
      <Accordion allowToggle={allowToggle} className={css(styles.accodion)}>
        {!updateData ? (
          userData.map((e) => {
            return (
              <UserAccordion
                id={e.id}
                first={e.first}
                last={e.last}
                dob={e.dob}
                gender={e.gender}
                email={e.email}
                picture={e.picture}
                country={e.country}
                description={e.description}
                setAllowToggle={setAllowToggle}
                editableId={editableId}
                setEditableId={setEditableId}
                setUpdateData={setUpdateData}
              />
            );
          })
        ) : (
          <Stack>
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
            <Skeleton height="50px" />
          </Stack>
        )}
      </Accordion>
    </MainLayout>
  );
}
const styles = StyleSheet.create({
  accodion: {
    width: "450px",
    margin: "auto",
    [MOBILE_QUERY]: {
      width: "100%",
    },
  },
});
export default App;
