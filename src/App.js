import React from "react";
import {Route, Link, Switch} from "react-router-dom";
import {Redirect} from "react-router";
import axios from "axios";
import Categories from "./Components/Categories";
import Search from "./Components/Search";
import SearchBar from "./Components/SearchBar"
import About from './Components/About';
import Home from './Components/Home';
import Contact from './Components/Contact';
import Representatives from './Components/Representatives';
import Chart from 'chart.js';
import "./App.css";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      categories: [],
      searchInput: '',
      totalFundingPerCategory: [],
      redirect: false
    };
  }

  componentDidMount() {
    axios
      .get("https://data.cityofnewyork.us/resource/9haj-uwpr.json?$select=funding_category&$" +
        "group=funding_category")
      .then(response => {
        let categoriesArr = [];
        response
          .data
          .forEach(elem => {
            return categoriesArr.push(elem.funding_category);
          });
        this.setState({categories: categoriesArr.sort()});
      })
      .catch(function (error) {
        console.log(error);
      });

      // axios
      //   .get("https://data.cityofnewyork.us/resource/9haj-uwpr.json?" + "$group=funding_category&$select=funding_category,SUM(payment_value)")
      //   .then(response => {
      //     this.setState({
      //       totalFundingPerCategory: response.data
      //     });
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
  }

  handleChange = e => {
    this.setState({searchInput: e.target.value, redirect: false});
  };

  handleSubmit = () => {
    const {searchInput} = this.state;
    this.setState({redirect: true});
    // return <Redirect to={`/search/${searchInput}`} />;
  };

  // renderHomepage = () => {
  //   const { totalFundingPerCategory } = this.state;
  //   var fundingChart = new Chart(ctx, {
  //     type: 'pie',
  //     data: {
  //       datasets: [{
  //         data: [10, 20, 30]
  //       }],

  //       // These labels appear in the legend and in the tooltips when hovering different arcs
  //       labels: [
  //           'Red',
  //           'Yellow',
  //           'Blue'
  //       ]
  //     },
  //     options: {}
  //   });
  //   return (
  //     <div>hey
  //       <Home />
  //     </div>
  //   );
  // };

  render() {
    const {categories, searchInput, redirect} = this.state;

    return (
      <div className="App">
        <div className="header">
          <span id="header-content">
            <Link to={`/`}>
              <img
                src="./logo-b-dark.svg"
                alt="TranspNYC"/>
            </Link>
            <SearchBar />
            <div className="headerSpace">
              <Link to='/reps'>Contact Reps</Link>
              <Link to='/about'>About</Link>
            </div>
          </span>
        </div>
        <div className="App-container">
          <nav id="navBar">
            {categories.map((elem, index) => (
              <Link key={index} to={`/category/${elem}`}>
                {/* <span id="NavLinks"> */}
                {elem.replace("*", "")}
                {/* </span> */}
              </Link>
            ))}
          </nav>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path='/about' component={About} />
            <Route path='/contact' component={Contact} />
            <Route path="/category/:category" component={Categories} />
            <Route path="/search/:search" component={Search} />
            <Route path='/reps' component={Representatives}/>
          </Switch>
        <footer id="footer">Made with 💕 by Team TranspareNYC</footer>
        </div>
      </div>
    );
  }
}

export default App;
