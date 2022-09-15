import React from "react";
import Task from "./components/Task";
import "./App.css";


class List extends React.Component<{}, { value: string, list: any [], check: string, tasksLeft: number, theme: boolean }> {
  a: string[];

  constructor(props: {} | Readonly<{}>) {
    super(props);
    this.state = {
      value: "",
      list: [],
      check: "all",
      tasksLeft: 0,
      theme: true,
    };

    this.a = [];
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event: { target: { value: any; }; preventDefault: () => void; }) {
    this.setState({ value: event.target.value });
    event.preventDefault();
  }

  handleDelete(item: any, index: number) {
    const a: any = [...this.state.list];
    a[index].complete = true;
    a.splice(index, 1);
    this.setState({
      list: [...a],
      tasksLeft: this.state.list.filter((item) => item.complete === false)
        .length,
    });
  }

  handleComplete(item: any, index: number) {
    const a: any = [...this.state.list];
    a[index].complete = !a[index].complete;
    this.setState({
      list: [...a],
      tasksLeft: this.state.list.filter((item) => item.complete === false)
        .length,
    });
  }

  render() {
    return (
      <div id={this.state.theme === true ? "background" : "backgroundW"}>
        <div id="headerFlex">
          <div id="header">TODO</div>
          <button
            id={this.state.theme === true ? "headerButton" : "headerButtonW"}
            onClick={() => {
              let theme = !this.state.theme;
              this.setState({ theme: theme });
            }}
          />
        </div>
        <div id="main">
          <div id={this.state.theme === true ? "newTask" : "newTaskW"}>
            <button
              id={
                this.state.theme === true ? "newTaskButton" : "newTaskButtonW"
              }
              onClick={() => {
                let newObj = this.state.list.slice();
                newObj.push({ value: this.state.value, complete: false });
                this.setState({
                  value: "",
                  list: newObj,
                  tasksLeft:
                    this.state.list.filter((item) => item.complete === false)
                      .length + 1,
                });
              }}
            />
            <input
              id={this.state.theme === true ? "inputB" : "inputW"}
              placeholder="Create a new todo..."
              type="text"
              value={this.state.value}
              onChange={this.handleChange}
            />
          </div>

          {this.state.check === "all" ? (
            <div>
              {this.state.list.map((item, index) => (
                <Task
                  key={item.value.toString()}
                  theme={this.state.theme}
                  value={item.value}
                  complete={item.complete}
                  handleComplete={() => {
                    this.handleComplete(item, index);
                  }}
                  handleDelete={() => {
                    this.handleDelete(item, index);
                  }}
                />
              ))}{" "}
            </div>
          ) : this.state.check === "done" ? (
            <div>
              {this.state.list
                .filter((item) => item.complete === true)
                .map((item, index) => (
                  <Task
                    key={item.value.toString()}
                    value={item.value}
                    theme={this.state.theme}
                    complete={item.complete}
                    handleComplete={() => {
                      this.handleComplete(item, index);
                    }}
                    handleDelete={() => {
                      this.handleDelete(item, index);
                    }}
                  />
                ))}
            </div>
          ) : (
            <div>
              {this.state.list
                .filter((item) => item.complete === false)
                .map((item, index) => (
                  <Task
                    key={item.value.toString()}
                    value={item.value}
                    theme={this.state.theme}
                    complete={item.complete}
                    handleComplete={() => {
                      this.handleComplete(item, index);
                    }}
                    handleDelete={() => {
                      this.handleDelete(item, index);
                    }}
                  />
                ))}
            </div>
          )}
          <div id={this.state.theme === true ? "footer" : "footerW"}>
            <span id="counter">{this.state.tasksLeft} items left.</span>
            <span id="buttons">
              <span
                onClick={() => {
                  let check = "all";
                  this.setState({ check: check });
                }}
              >
                All
              </span>
              <span
                onClick={() => {
                  let check = "undone";
                  this.setState({ check: check });
                }}
              >
                Active
              </span>
              <span
                onClick={() => {
                  let check = "done";
                  this.setState({ check: check });
                }}
              >
                Completed
              </span>
            </span>

            <span id="clearCompleted">
              <span
                onClick={() => {
                  let newObj: any = [];
                  this.state.list
                    .filter((item) => item.complete === false)
                    .map((item, index) =>
                      newObj.push({ value: item.value, complete: false })
                    );
                  this.setState({
                    value: "",
                    list: newObj,
                    check: "all",
                    tasksLeft: this.state.list.filter(
                      (item) => item.complete === false
                    ).length,
                  });
                }}
              >
                Clear completed
              </span>
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default List;


