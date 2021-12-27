import { useState } from "react";
import "./styles.css";

export default function App() {
  const [arrString, setArrString] = useState(""),
    [mainArr, setMainArr] = useState([]),
    [currentMove, setCurrentMove] = useState(1),
    [totalMove, setTotalMove] = useState(0),
    [currentColor, setCurrentColor] = useState("#FFFFFF"),
    [currentState, setCurrentState] = useState([]),
    [currentIndex, setCurrentIndex] = useState(0),
    [sortingStates, setSortingStates] = useState([]),
    [isPlayClick, setIsPlayClicked] = useState(false),
    swapColor = " hsl(330, 100%, 50%)",
    subListColor = "hsl(160, 100%, 50%)";

  useState(() => {}, [sortingStates]);

  function handleInput(val = "") {
    setArrString(val);
    let arr = val.split(",");
    setMainArr(arr);
    setCurrentState(arr);
    getAllSortingStage(arr);
  }

  let arr = [83, 6, 63, 84, 9, 14, 90, 24, 17];

  function getAllSortingStage(data = []) {
    console.log(data);
    let resStates = [],
      numbers = [...data];
    for (let i = 1; i < numbers.length; i += 1) {
      for (let j = i; j > 0; j -= 1) {
        if (parseInt(numbers[j - 1]) > parseInt(numbers[j])) {
          const temp = numbers[j - 1];
          numbers[j - 1] = numbers[j];
          numbers[j] = temp;
          let numbersArr = [...numbers];
          resStates.push(numbersArr);
        }
      }
    }
    setSortingStates(resStates);
    setTotalMove(resStates.length);
  }

  function handelStateButtonClick(type = "") {
    let index;
    switch (type) {
      case "start":
        setCurrentIndex(0);
        setCurrentState(mainArr);
        break;
      case "prev":
        index = currentIndex - 1;
        if (sortingStates[index]) {
          setCurrentIndex(index);
          sortingStates[index] && setCurrentState(sortingStates[index]);
        }
        break;
      case "next":
        index = currentIndex + 1;
        if (sortingStates[index]) {
          setCurrentIndex(index);
          setCurrentState(sortingStates[index]);
        }
        break;
      case "final":
        setCurrentIndex(sortingStates.length - 1);
        setCurrentState(sortingStates[sortingStates.length - 1]);
        break;
      case "play":
        handlePlayBtn();
        break;
      default:
        break;
    }
  }

  function handlePlayBtn() {
    if (!isPlayClick) {
      for (let i = currentIndex; i < sortingStates.length; i++) {
        setTimeout(() => {
          setCurrentIndex(() => i);
          setCurrentState(() => sortingStates[i]);
        }, 1000 * i);
      }
    }
    setIsPlayClicked(!isPlayClick);
  }

  function renderBarGraph(height = "0px") {
    return (
      <div
        className="bar"
        style={{
          height: `${height}px`,
          background: currentColor,
          width: "50px"
        }}
      ></div>
    );
  }

  function renderVisualizer() {
    return (
      <div className="visualizer-container">
        <div className="heading">Insertion sort visualizer</div>
        <div className="bar-container">
          {!!currentState.length &&
            currentState.map((data, index) => (
              <div className="bar-wrap" key={index}>
                {renderBarGraph(data)}
              </div>
            ))}
        </div>
        <div className="buttons-wrapper">
          <div
            className="start-btn btn md-ml10 md-p5"
            onClick={() => handelStateButtonClick("start")}
          >
            s
          </div>
          <div
            className="prev-btn btn md-ml10 md-p5"
            onClick={() => handelStateButtonClick("prev")}
          >
            p
          </div>
          <div
            className="play-btn btn md-ml10 md-p5"
            onClick={() => handelStateButtonClick("play")}
          >
            pp
          </div>
          <div
            className="next-btn btn md-ml10 md-p5"
            onClick={() => handelStateButtonClick("next")}
          >
            n
          </div>
          <div
            className="final-btn btn md-ml10 md-p5"
            onClick={() => handelStateButtonClick("final")}
          >
            F
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="App">
      <div className="main-container">
        <div className="move-wrapper">
          Move {currentIndex + 1} of {totalMove}
        </div>
        <div className="input-container">
          <input
            type="text"
            value={arrString}
            onChange={(e) => handleInput(e.target.value)}
          />
        </div>
        {renderVisualizer()}
      </div>
    </div>
  );
}
