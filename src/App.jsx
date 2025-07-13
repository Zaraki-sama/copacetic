import Layout from "./components/layouts/Layout.jsx";
import Welcome from "./components/layouts/Welcome.jsx";
import Dashboard from "./components/layouts/Dashboard.jsx";
import Challenge from "./components/layouts/Challenge.jsx";
import { useState, useEffect } from "react";
import WORDS from "./utils/VOCAB.json";
import { countdownIn24Hours, getWordByIndex, PLAN } from "./utils/index.js";

function App() {
  const [selectedPage, setSelectedPage] = useState(0);

  const [name, setName] = useState("");
  const [day, setDay] = useState(1);
  const [datetime, setDatetime] = useState(null);
  const [history, setHistory] = useState({});
  const [attempts, setAttempts] = useState(0);

  const daysWords = PLAN[day].map((idx) => {
    return getWordByIndex(WORDS, idx).word;
  });
  console.log(daysWords);

  function handleChangePage(pageIndex) {
    setSelectedPage(pageIndex);
  }

  function handleCreateAccount() {
    if (!name) {
      return;
    }

    handleChangePage(1);

    localStorage.setItem("username", name);
  }
  function handleCompleteDay() {
    const newDay = day + 1;
    const newDatetime = Date.now();
    setDay(newDay);
    setDatetime(newDatetime);

    localStorage.setItem(
      "day",
      JSON.stringify({ day: newDay, datetime: newDatetime })
    );

    setSelectedPage(1);
  }

  function handleIncrementAttempts() {
    //take the current attempt number , and add one and save it to local storage
    const newRecord = attempts + 1;

    localStorage.setItem("attempts", newRecord);
    setAttempts(newRecord);
  }
  // selectedPage = 2; // zero indicates welcome page , 1 indicates dashboard and 2 for the challenge page
  useEffect(() => {
    // this callback function is triggered on page load
    if (!localStorage) {
      return;
    }
    if (localStorage.getItem("username")) {
      setName(localStorage.getItem("username"));

      //we have a name we can skip to the dashboard
      setSelectedPage(1);
    }
    if (localStorage.getItem("attempts")) {
      setAttempts(parseInt(localStorage.getItem("attempts")));
    }
    if (localStorage.getItem("history")) {
      setHistory(JSON.parse(localStorage.getItem("history")));
    }

    if (localStorage.getItem("day")) {
      const { day: d, datetime: dt } = JSON.parse(localStorage.getItem("day"));
      setDatetime(dt);
      setDay(d);

      if (d > 1 && dt) {
        const diff = countdownIn24Hours(dt);
        if (diff < 0) {
          let newHistory = { ...history };
          const timestamp = new Date(dt);
          const formattedTimestamp = timestamp
            .toString()
            .split(" ")
            .slice(1, 4)
            .join(" ");

          newHistory[formattedTimestamp] = d;

          setHistory(newHistory);
          setDay(1);
          setDatetime(null);
          setAttempts(0);

          localStorage.setItem("attempts", 0);
          localStorage.setItem("history", JSON.stringify(newHistory));
          localStorage.setItem(
            "day",
            JSON.stringify({ day: 1, datetime: null })
          );
        }
      }
    }
  }, []);
  const pages = {
    0: (
      <Welcome
        handleCreateAccount={handleCreateAccount}
        userName="hello world"
        name={name}
        setName={setName}
      />
    ),
    1: (
      <Dashboard
        name={name}
        attempts={attempts}
        PLAN={PLAN}
        day={day}
        handleChangePage={handleChangePage}
        daysWords={daysWords}
        datetime={datetime}
        history={history}
      />
    ),
    2: (
      <Challenge
        day={day}
        daysWords={daysWords}
        handleChangePage={handleChangePage}
        handleIncrementAttempts={handleIncrementAttempts}
        handleCompleteDay={handleCompleteDay}
        PLAN={PLAN}
      />
    ),
  };
  return <Layout>{pages[selectedPage]}</Layout>;
}
export default App;
