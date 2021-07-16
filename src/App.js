import React from "react";

import "./styles.css";
import Card from "./Card";

export default class App extends React.Component {
  //creating an array with all the cards inside//
  state = {
    cardsArray: [
      "six",
      "six",
      "seven",
      "seven",
      "eight",
      "eight",
      "nine",
      "nine",
      "ten",
      "ten",
      "jack",
      "jack",
      "queen",
      "queen",
      "king",
      "king",
      "ace",
      "ace",
    ],
    matches: [],
    card1: null,
    card2: null,
    locked: false,
    failure: false,
    toggleFlip: false,
    moves: 0,
    winScreen: false,
  };

  //setting cards async and state//
  setCards = async (card) => {
    if (this.state.card1 === null) {
      this.setState({ card1: card });
    } else if (this.state.card1 !== null && this.state.card2 === null) {
      await this.setState({
        card2: card,
        locked: true,
        moves: this.state.moves + 1,
      });
      this.checkMatch();
      setTimeout(() => this.setState({ locked: false }), 1000);
    }
  };

  //creating a fucntion to see if the cards match
  checkMatch = () => {
    if (this.state.card1 === this.state.card2) {
      this.setState({
        matches: [...this.state.matches, this.state.card1],
        card1: null,
        card2: null,
      });
    } else {
      this.setState({
        card1: null,
        card2: null,
        toggleFlip: !this.state.toggleFlip,
      });
    }
  };

  //creating a function to shuffle the cards every game //
  shuffle = (array) => {
    array.sort(() => Math.random() - 0.5);
  };

  //rendering cards and using Map Array//
  renderCards = () => {
    return this.state.cardsArray.map((card) => {
      return (
        <Card
          card={card}
          locked={this.state.locked}
          setCards={this.setCards}
          failure={this.state.failure}
          matches={this.state.matches}
          toggleFlip={this.state.toggleFlip}
        />
      );
    });
  };

  componentWillMount() {
    this.shuffle(this.state.cardsArray);
  }

  componentDidUpdate = (prevState) => {
    if (this.state.matches.length === this.state.cardsArray.length / 2) {
      setTimeout(() => this.setState({ winScreen: true }), 500);
    }
  };

  //refresh page after finished when clicking the restart button//
  refreshPage = () => {
    window.location.reload(false);
  };

  //rendering game , creating a button and styling //
  //win screen with a photo and restart button//
  //moves displayed aswell in completing and showing you your score.
  render() {
    return (
      <div>
        <h1>
          <u>Welcome To Delano's Memory Game !</u>{" "}
        </h1>
        <h1 className="Heading">
          <u>How To Play.</u>
        </h1>
        <p>
          <ol>
            <li>Click on The cards to make them flip.</li>
            <li>
              Try matching all the cards in there respected pair to win the
              game.
              <li>
                Score and the number of moves will be diplayed on the top right
                of the screen.
              </li>
            </li>
            <li> Most Importantly Have FUN !! </li>
          </ol>
        </p>

        {!this.state.winScreen ? (
          <div className="App">
            <div className="memory-game">{this.renderCards()}</div>
            <div
              style={{
                position: "absolue",
                top: 0,
                right: 0,
                height: 50,
                width: 200,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <button
                style={{
                  backgroundColor: "white",
                  borderColor: "black",
                  padding: 10,
                  borderRadius: 40,
                  fontSize: 18,
                  fontWeight: "bold",
                }}
                onClick={this.refreshPage}
              >
                {this.state.matches.length === this.state.cardsArray.length / 2
                  ? "New Game"
                  : "Restart"}
              </button>
              <h4
                style={{ marginTop: 10, textAlign: "center", color: "white" }}
              >
                Score: {this.state.matches.length * 10}
              </h4>
              <h4
                style={{ marginTop: 10, textAlign: "center", color: "white" }}
              >
                Moves: {this.state.moves}
              </h4>
            </div>
          </div>
        ) : (
          <div className="App">
            <div className="win-screen">
              <img
                src={
                  "https://i.pinimg.com/474x/d6/ec/34/d6ec3410a8babd77a758bcd20b632470.jpg"
                }
                height="400px"
                alt="winner"
              />
              <div
                style={{
                  position: "absolue",
                  top: 100,
                  right: 0,
                  height: 50,
                  width: 200,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <button
                  style={{
                    backgroundColor: "white",
                    borderColor: "black",
                    padding: 10,
                    borderRadius: 40,
                    fontSize: 18,
                    fontWeight: "bold",
                  }}
                  onClick={this.refreshPage}
                >
                  Restart
                </button>
                <h4
                  style={{ marginTop: 10, textAlign: "center", color: "white" }}
                >
                  Score: {this.state.matches.length * 10}
                </h4>
                <h4
                  style={{ marginTop: 10, textAlign: "center", color: "white" }}
                >
                  Moves: {this.state.moves}
                </h4>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
