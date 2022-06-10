import React, { Component } from "react";

class Toc extends Component {
  shouldComponentUpdate(newProps, newState) {
    console.log(" ==> TOC render sholdComponentUpdate");
    if (newProps.data === this.props.data) {
      return false;
    }
    return true;
  }
  render() {
    console.log(" ==> TOC render");
    // const lists = [];
    let data = this.props.data;

    data = data.map((el) => {
      return (
        <li key={el.id}>
          <a
            href={"/content/" + el.id}
            id={el.id}
            onClick={(e) => {
              e.preventDefault();
              this.props.onChangePage(e.target.id);
            }}
          >
            {el.title}
          </a>
        </li>
      );
    });

    return (
      <nav>
        <ul>{data}</ul>
      </nav>
    );
  }
}

export default Toc;
