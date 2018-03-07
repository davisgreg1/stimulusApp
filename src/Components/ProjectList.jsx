import React from 'react';
import axios from 'axios';
import currencyFormatter from 'currency-formatter';
 
class ProjectList extends React.Component {
  constructor(props) {
    super(props);
    
    this.agencyName = {
      OPS: "Office of Protection Services",
      DEP: "Department of Environmental Protection",
      DOITT: "Department of Information Technology & Telecommunications",
      DOT: "Department of Transportation",
      NYCHA: "New York City Housing Authority",
      DPR: "Department of Parks & Recreation",
      OMB: "Office of Management & Budget",
      HPD: "Housing Preservation & Development",
      MO: "Mayor's Office",
      DHS: "Department of Homeland Security",
      DOP: "Department of Probation",
      NYPD: "New York Police Department",
      FDNY: "New York City Fire Department",
      OCME: "Office of Chief Medical Examiner",
      DOC: "Department of Correction",
      CJC: "Criminal Justice & Criminology",
      DFTA: "Department For The Aging",
      HRA: "Human Resources Administration",
      FPHNY: "Fund for Public Health NYC",
      ACS: "Administration for Children Services",
      DOHMH: "Department of Health & Mental Hygiene",
      DYCD: "Department for Youth & Community Development",
      SBS: "Small Business Services",
      DCAS: "Department of Citywide Administrative Services",
      DOE: "Department Of Education"
    };

    this.state = {
      projects: [],
      agency: '',
    }
  }

  componentDidMount() {
    const { category, agency } = this.props;
    let path = `$where=award_lead_city_agency='${agency}' AND funding_category='${category}'&$LIMIT=50`
    axios
      .get('https://data.cityofnewyork.us/resource/9haj-uwpr.json?' + path)
      .then(response => {
        this.setState({
          projects: response.data,
          agency: agency
        })
      })
      .catch(error => {
        console.log("error:", error)
      })
  }

  componentWillReceiveProps(nextProps) {
    const { category, agency } = nextProps;
    let path = `$where=award_lead_city_agency='${agency}' AND funding_category='${category}'&$LIMIT=50`
    axios
      .get('https://data.cityofnewyork.us/resource/9haj-uwpr.json?' + path)
      .then(response => {
        this.setState({
          projects: response.data,
          agency: agency
        })
      })
      .catch(error => {
        console.log("error:", error)
      })
  }

  render() {
    const { projects, agency } = this.state;
    let total = projects.reduce((total, currElem) => {
        return currElem.payment_value
          ? total + Number(currElem.payment_value)
          : total + 0
        }, 0
      );
    return (
      <div>
        <h1>{agency}: {this.agencyName[agency]}</h1>
        <h4>Total Funds Awarded: {currencyFormatter.format(total, { code: 'USD' })}</h4>
        <div className="project-container">
          {projects.map((project, idx) =>
            <div key={idx} id="project" draggable="true">
              <p>Project Name: {project.project_name}</p>
              <p>Payment Value: {currencyFormatter.format(Number(project.payment_value), { code: 'USD' })}</p>
              <p>Funding Source: {project.funding_source}</p>
              <p>Description: {project.project_description}</p>
            </div>
          )}
        </div>
      </div>
    )
  }
}

export default ProjectList
