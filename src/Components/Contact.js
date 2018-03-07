import React from 'react'
import axios from 'axios'

class Contact extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            officials: []
        }
    }

    componentDidMount() {
        let path = `$where=city='NEW YORK'`
        axios
            .get('https://data.ny.gov/resource/n7ms-5kh9.json?' + path)
            .then(response => {
                this.setState({
                    officials: response.data
                })
            })
            .catch(error => {
                console.log("error:", error)
            })
    }

    render() {
        const { officials } = this.state
        return (
            <div className="officials-container">
                <div class="officials">
                    <h1>Offices of NYC</h1>
                    {officials.map((official, idx) => <div key={idx} className="official-info">
                        <p>{official.public_authority_name}</p>
                        <p>{official.address}</p>
                        <p>{official.zip}</p>
                        {official.website
                            ? <p><a href={`${official.website}`} target="_blank">{official.website}</a></p>
                            : ""}
                    </div>)}
                </div>
            </div>
        )
    }
}

export default Contact;