import React, { Component } from 'react';
import './App.css';

class App extends Component {
  state = {
    list: [],
    current: "",
    bgColor: "",
    boxAll: false
  };


  handleChange = event => {
    this.setState({ boxAll: event.target.checked }, () => {
      console.log("This returned true or false", this.state.boxAll);
    });
  };

  componentDidMount = async () => {
    const response = await fetch("https://morning-bastion-71577.herokuapp.com/data")
    const data = await response.json()
    console.log(data)
    this.setState({list: data.data})
  }

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
    task.push({ todo: this.state.current});
    this.setState({ list: task, current: "" });

    console.log(this.state.list)
    
    
    fetch("https://morning-bastion-71577.herokuapp.com/register", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
        todo: this.state.current
      })
    })
  };

  remove = (index, task) => {
    let tasksToDo = this.state.list;
    tasksToDo.splice(index, 1)
    this.setState({list: tasksToDo})

    fetch("https://morning-bastion-71577.herokuapp.com/delete", {
        method: "POST",
        headers: {"content-type": "application/json"},
        body: JSON.stringify({
        todo: task.todo
      })
    })
  }

  boxClick = () => {
    this.setState({
      bgColor: "red"
    })
  }


  render() {
    return (
      <div className="background">
        <div className="wrap">
          <div className="bottom"></div>
          <div className="middle"></div>
          <div className="top"></div>
        </div>
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
                    <input type="checkbox" id="todo" onChange={this.handleChange}></input>
                    <label key={index}>{task.todo}</label>
                  </div>
                  <div className="right">
                    <button className="close" onClick={() => this.remove(index, task)}>X</button>
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    );
  }
}


export default App;
