import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import { Redirect , withRouter } from "react-router";

class SearchBar extends React.Component {
  constructor() {
    super();
    this.state = {
      searchInput: "",
      inputQuery: "",
      redirect: false
    };
  }

  handleChange = e => {
    this.setState({
      searchInput: e.target.value,
      inputQuery: e.target.value,
      redirect: false
    });
  };

  handleSubmit = () => {
    const location = this.props.location.pathname
    const { searchInput, inputQuery } = this.state;
    this.setState({
      redirect: true,
      inputQuery: ""
    });
    // return <Redirect to={`/search/${searchInput}`} />;
  };

  render() {
    const { inputQuery, searchInput, redirect } = this.state;
    const location = this.props.location.pathname
    if (redirect) {
      return (
        <div>
        <Redirect
          to={{
            pathname: `/search/${searchInput}`,
            state: { redirect: false }
          }}
        />
        <div className="box">
            <div className="container-1">
            <span className="icon"><i className="fa fa-search"></i></span>
                <input
                  type="search"
                  id="search"
                  onChange={this.handleChange}
                  placeholder="Search e.g. housing, education..."
                  className="searchBar"
                  value={inputQuery}
                />
                <button onClick={this.handleSubmit} disabled={!searchInput}><i className="fa fa-search fa-2x"></i></button>
            </div>
        </div>
      </div>
      );
    }

    return (
      <div>
        <div className="box">
          <div className="container-1">
              <span className="icon"><i className="fa fa-search"></i></span>
              <input
                type="search"
                id= "search"
                onChange={this.handleChange}
                placeholder="Search e.g. housing, education..."
                className="searchBar"
                value={searchInput}
              />
              <button onClick={this.handleSubmit} disabled={!searchInput}><i className="fa fa-search fa-2x" ></i></button>
          </div>
        </div>
      </div>
    );
  }
}

export default withRouter(SearchBar);
