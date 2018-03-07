import React from 'react';
import axios from 'axios';

import dotenv from 'dotenv';

import ProjectList from './ProjectList';
import SelectList from './SelectList';

const KEY = process.env.REACT_APP_API_KEY;

class Categories extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      category: '',
      organizations: [],
      selectedValue: ''
    }
  }

  handleSelect = e => {
    this.setState({selectedValue: e.target.value})
  }

  componentDidMount() {
    let path = `$where=funding_category='${this.props.match.params.category}'&$group=award_lead_city_agency&$select=award_lead_city_agency`
    axios
      .get("https://data.cityofnewyork.us/resource/9haj-uwpr.json?" + path)
      .then(response => {
        let organizations = [];
        response
          .data
          .forEach(agency => {
            organizations.push(agency.award_lead_city_agency)
          });
        this.setState(() => {
          return {category: this.props.match.params.category, organizations}
        })
      })
  }

  componentWillReceiveProps(nextProps) {
    let path = `$where=funding_category='${nextProps.match.params.category}'&$group=award_lead_city_agency&$select=award_lead_city_agency`;
    axios
      .get("https://data.cityofnewyork.us/resource/9haj-uwpr.json?" + path)
      .then(response => {
        let organizations = [];
        response
          .data
          .forEach(agency => {
            organizations.push(agency.award_lead_city_agency)
          })
        this.setState(() => {
          return {category: nextProps.match.params.category, organizations, selectedValue: ""}
        })
      })
  }

  render() {

    const {category, organizations, selectedValue} = this.state
    return (
      <div>
        <h1>{category.replace("*", "")}</h1>
        Select an agency: {" "}
        <SelectList
          values={organizations}
          handleSelect={this.handleSelect}
          selectedValue={selectedValue}/> {selectedValue
          ? <ProjectList category={category} agency={selectedValue}/>
          : ""
}
      </div>
    )
  }
}

export default Categories;
