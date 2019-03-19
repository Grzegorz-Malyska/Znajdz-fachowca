import React from 'react';
import {Redirect, Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import ExpertCard from "../components/ExpertCard";
import axios from "axios/index";

class ExpertsResults extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            experts: this.props.location.state === undefined ? [] : this.props.location.state.experts,
            city: this.props.location.state === undefined ? "" : this.props.location.state.city,
            category: this.props.location.state === undefined ? "" : this.props.location.state.category
        };

        this.refreshExperts = this.refreshExperts.bind(this);
    }

    refreshExperts() {
        axios.get("http://localhost:8080/api/expert", {
            params: {
                city: this.state.city,
                category: this.state.category
            }
        })
            .then(res => this.setState({experts: res.data}))
            .catch(() => this.setState({experts: []}));
    }

    render() {
        if(this.props.location.state === undefined) {
            return <Redirect to="/" />;
        }

        return (
            <div>
                <nav className="navbar navbar-inverse navbar-expand-lg navbar-header fixed-top">
                    <div className="container">
                        <Link className="navbar-brand" to="/"><h3>Znajdź fachowca</h3></Link>
                        <button className="navbar-toggler ml-auto" type="button" data-toggle="collapse"
                            data-target="#navbarData" aria-controls="probootstrap-navbar" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span><i className="ion-navicon" /></span>
                        </button>
                        <div className="collapse navbar-collapse" id="navbarData">
                            <ul className="navbar-nav ml-auto">
                                <li className="nav-item"><Link className="nav-link" to="/"><h4>Strona główna</h4></Link></li>
                            </ul>
                        </div>
                    </div>
                </nav>

                <h1 style={{marginTop: "60px"}} className="text-center">Fachowcy:</h1>
                <div style={{marginTop: "85px"}} className="card-deck">
                    {this.state.experts.map(e => <ExpertCard key={e.name} refreshExperts={this.refreshExperts} expert={JSON.stringify(e)} />)}
                </div>
            </div>
        );
    }
}

export default withRouter(ExpertsResults);
