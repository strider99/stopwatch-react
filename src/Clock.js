import React from 'react';
import ReactDOM from 'react-dom';
import key from 'keymaster';

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      elapsedTime: 0.00,
      buttonName: 'Start',
      recordedData: []
    }

    this.isStopwatchRunning = false;
    this.timerID;

  }

  toggleStopwatch = () => {
    this.isStopwatchRunning = !this.isStopwatchRunning;


    if (this.isStopwatchRunning) {

      this.timerID = setInterval(() => {
        this.setState(function (prevState) {
          return {
            elapsedTime: ++prevState.elapsedTime,
            buttonName: 'Stop'
          }
        });

      }, 10);
    }
    else {
      clearInterval(this.timerID);
      this.setState({
        buttonName: 'Start'
      })
    }

  }

  // Reset The Stopwatch
  resetStopwatch = () => {
    if (this.isStopwatchRunning) {
      this.toggleStopwatch();
    }
    this.setState(function (prevState) {
      return {
        elapsedTime: 0.00,
        buttonName: 'Start',
        recordedData: []
      }
    })

  }
  // Record Times 
  recordTimes = () => {
    if (this.state.recordedData.indexOf(this.state.elapsedTime) == -1) {

      this.setState(function (prevState) {
        return {

          recordedData: [...prevState.recordedData, this.state.elapsedTime]
        }
      });
    }


  }
  componentDidMount = () => {
    key('s', this.toggleStopwatch);
    key('r', this.resetStopwatch);
    key('t', this.recordTimes);
  }

  render() {
    return (
      <div>

        <h2>{(this.state.elapsedTime / 100).toFixed(2)}</h2>

        <button onClick={this.toggleStopwatch} > {this.state.buttonName} </button>
        <button onClick={this.resetStopwatch} >Reset</button>
        <button onClick={this.recordTimes} >Record</button>

        <ul>
          {
            this.state.recordedData.map((time) => {
              return <li key={time}> {(time / 100).toFixed(2)} </li>
            })
          }
        </ul>


      </div>
    )
  }
}

export default Clock;