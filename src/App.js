import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    list: [],
    current: "",
    bgColor: ""
  };

  handleEnter = event => {
    if (event.key === "Enter") {
      this.submit();
    }
  };

  handleInput = e => {
    this.setState({ current: e.target.value });
  };

  submit = () => {
    let task = this.state.list;
    if(this.state.current === ""){
      return alert(`enter a value`)
    }
    task.push(this.state.current);
    this.setState({ list: task, current: "" });
  };

  remove = (index) => {
    let task = this.state.list;
    task.splice(index, 1)
    this.setState({list: task})
  }

  boxClick = () => {
    this.setState({
      bgColor: "red"
    })
  }


  render() {
    return (
      <div className="address">
        <h1>To-Do List</h1>
        <div className="form">
          <input
            type="text"
            onKeyPress={this.handleEnter}
            onChange={this.handleInput}
            value={this.state.current}
            placeholder="Give me a task"
          ></input>
          <input type="submit" onClick={this.submit} value = "ADD"></input>
        </div>
        <div className="contacts">
          {this.state.list.map((task, index) => {
            return (
              <div className="task">
                <div className="left">
                  <input type="checkbox" id="todo"></input>
                  <label key={index}>{task}</label>
                </div>
                <div className="right">
                  <button className="close" onClick={() => this.remove(index)}>X</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    );
  }
}


export default App;
