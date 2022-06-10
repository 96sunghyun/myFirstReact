import React, { Component } from "react";
import "./App.css";
import Toc from "./components/Toc";
import Subject from "./components/Subject";
import ReadContent from "./components/ReadContent";
import Control from "./components/Control";
import UpdateContent from "./components/Update";
import CreateContent from "./components/CreateContent";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_contents_id = 3;
    this.state = {
      selected_id: null,
      mode: "welcome",
      subject: {
        title: "Web",
        sub: "world wide web!",
      },
      welcome: { title: "Welcome", desc: "Hello, React!!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }

  getReadContent() {
    const id = this.state.selected_id;
    return this.state.contents.filter((el) => {
      return el.id === id;
    })[0];
  }

  getContent() {
    let _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      const data = this.getReadContent();
      _title = data.title;
      _desc = data.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={(_title, _desc) => {
            this.max_contents_id = this.max_contents_id + 1;
            let _contents = this.state.contents.concat({
              id: this.max_contents_id,
              title: _title,
              desc: _desc,
            });
            this.setState({ contents: _contents, mode: "read" });
          }}
        />
      );
    } else if (this.state.mode === "update") {
      if (this.state.selected_id === null) {
        return null;
      }
      const _data = this.getReadContent();
      _article = (
        <UpdateContent
          data={_data}
          onSubmit={(_id, _title, _desc) => {
            const _contents = [...this.state.contents];
            for (let i = 0; i < _contents.length; i++) {
              if (_contents[i].id === _id) {
                _contents[i] = { id: _id, title: _title, desc: _desc };
                break;
              }
            }
            this.setState({ contents: _contents, mode: "read" });
          }}
        />
      );
    }
    return _article;
  }

  render() {
    return (
      <div className="App">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={() => {
            this.setState({ mode: "welcome" });
          }}
        />
        <Toc
          data={this.state.contents}
          onChangePage={(id) => {
            this.setState({
              mode: "read",
              selected_id: Number(id),
            });
          }}
        />
        <Control
          onChangeMode={(_mode) => {
            if (_mode === "delete") {
              if (window.confirm("Really??")) {
                const _contents = this.state.contents.filter((el) => {
                  return el.id !== this.state.selected_id;
                });
                this.setState({ contents: _contents, mode: "welcome" });
                alert("Deleted!!");
              }
            } else {
              this.setState({ mode: _mode });
            }
          }}
        />
        {this.getContent()}
      </div>
    );
  }
}
export default App;
