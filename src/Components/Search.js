import React from 'react';
import currencyFormatter from 'currency-formatter';
/*
This.state explanation: keywordQueryInput - initial user input; resultsFound - initially set to false === 0;
results - gather API information; keywordSubmitted: takes keywordQueryInput and renders on page with results;
*/
class Search extends React.Component{
    constructor(){
        super();
        this.state={
            keywordQueryInput:'',
            resultsFound: false,
            results: [],
            keywordSubmitted: '',
            noResultMessage: '',
        };
    }

//handleInput - collects user's input and updates keywordQueryInput;
    handleInput = event => {
        this.setState({
            keywordQueryInput: event.target.value
        })
    }


/*
handleSubmit - uses keywordQueryInput value to fetch query from Federal Stimulus Data API. If response length is > 0, updates
resultsFound to true; appends response into results; keywordQueryInput.value is appended to keywordSubmitted,
and keywordQueryInput is reset back to ''.
*/
    handleSubmit = event => {
        const { keywordQueryInput,results } = this.state;
            this.handleQuery(keywordQueryInput)
        };

    handleQuery = (value) => {
        fetch("https://data.cityofnewyork.us/resource/9haj-uwpr.json?$q=" + value + '&$limit=50')
        .then(response => response.json())
        .then(obj => {
            console.log(obj);
            if(obj.length > 0){
            this.setState({
                resultsFound: true,
                results: obj,
                keywordSubmitted: value,
                keywordQueryInput: '',
                noResultMessage: ''
            })
            } else {
              this.setState({
                results: [],
                resultsFound: false,
                noResultMessage: "No results founds. Please try again."
              });
              console.log(this.state.noResultMessage); 
            } 
        })
        .catch((error)=> {
            console.log(error);
        });
    }

    componentDidMount(){
        const {search} = this.props.match.params;
        this.handleQuery(search);
        console.log('props', this.props.match.params.search);
    }

    componentWillReceiveProps(props){
        const { search } = props.match.params
        this.handleQuery(search)
        console.log('props will receive', props.match.params.search)
    }
/*
on the render - two new variables: results.length; one message to render both keyword and number of results (even though
    demo version is limited to 10.
*/    
    render(){
        const { results, resultsFound, keywordSubmitted, keywordQueryInput,noResultMessage }= this.state;
        const resultsLength = results.length;
        const message = (resultsFound === false) ? '' : `Results for '${keywordSubmitted}', ${resultsLength} projects.`;

        return(
            <div>
                <h2>Search Projects and Funds By Keyword</h2>
                <h5>To search by keyword, please type in a word, and click the Search Button to see your results.</h5>
                <input type='text' 
                       placeholder='Search e.g. housing, education...'
                       value={keywordQueryInput} 
                       onInput={this.handleInput} /> {" "}
                <button onClick={this.handleSubmit}><i class="fa fa-search"></i></button>
                <h4>{message}</h4>
                <h4>{noResultMessage}</h4>
                <div className="project-container">
                    {results.map((list, index)=>
                        <div id="project" key={index} draggable="true">
                            <p>
                                <b>Organization</b>: {list.payment_recipient}<br/> 
                                <b>Category</b>: {list.funding_category}<br/>
                                <b>Funding Amount</b>: {currencyFormatter.format(Number(list.payment_value), { code: 'USD' })}<br/>
                                <b>Project Name</b>: {list.project_name}<br/>
                                <b>Project Description</b>: {list.project_description}   
                            </p>
                        </div>
                    )}
                </div>
            </div>
        )
    }
}

export default Search;