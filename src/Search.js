import React from 'react';

//Basic skeleton for Search Page
//To do as of Saturday, 4:05pm: render additional appropriate information in list.
class Search extends React.Component{
    constructor(){
        super();
        this.state={
            keywordQueryInput:'',
            results: []
        };
    }

//collects user's input and updates this.state;
    handleInput = event => {
        this.setState({
            keywordQueryInput: event.target.value
        })
        console.log(this.state.keywordQueryInput);
    }

//uses keywordQueryInput value to fetch query from Federal Stimulus Data API
//stores response in this.results...for now.
    handleSubmit = event => {
        const { keywordQueryInput,results } = this.state;
            fetch("https://data.cityofnewyork.us/resource/9haj-uwpr.json?$q=" + keywordQueryInput )
            .then(response => response.json())
            .then(obj=>{
                console.log(obj);
                this.setState({
                    results: obj
                })
                console.log(results);
            })
            .catch((error)=> {
                    console.log(error);
                });
        };
    
//In process: description, input field, submit button. Need to properly create component
//to render values in a list. Additional information will be added to results.
    render(){
        const { results }= this.state;
        console.log("state in the render:", this.state)
        return(
            <div>
                <h1>Search By Keyword</h1>
                <h3>To search by keyword, please type in a word, and click the "Submit" button.</h3>
                <input type='text' placeholder='Please type in your keyword here' onInput={this.handleInput} />
                <button onClick={this.handleSubmit}>Submit</button>
            <ol>
                {results.map(list=>{
                   return <li>{list.payment_recipient}</li>
                })}
            </ol>
            </div>
            
        )
    }
}

export default Search;