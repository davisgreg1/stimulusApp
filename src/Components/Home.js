import React from 'react';
import { Link } from 'react-router-dom';

import '../App.css';

const Home = props => {
    return (
        <div className="home-container">
            <div className="home-blurb">
                <p className="home-info">
                   The information available about public funding and
                    government agencies is very dense. It could be a challenge for the average New
                    Yorker to find out whether the issues they care about are receiving funding, or
                    even which organization is responsible for said issues. When
                    someone wants to contact a representative, vote for a candidate, or determine
                    which organization to support, it is critical to have access to digestible
                    information regarding these issues.
                </p>
                <p className="home-info">
                    <span id="transparency">transpareNYC</span> takes all the project funding information from the publicly provided API
                    and organizes it into a much more readable form. We hope that by making this
                    information easy to understand, it would give the average NYC resident knowledge
                    about whether the issues they care about are being addressed and which agencies
                    are responsible.
                </p>
                <p className="home-info">
                    To use transpareNYC, please click on one of the eight (8) categories above. Then 
                    select an agency from the dropdown menu to see a list of projects they funded. If you 
                    would like to search by keyword, please use the search bar at the top of page to enter 
                    a keyword, and click the button to see the results.
                </p>
            </div>
            <div className="home-contact">
                <Link to='/contact'>Contact your local public authority figure</Link>
            </div>
        </div>
    )
}
export default Home;