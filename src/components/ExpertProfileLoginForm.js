import React from "react";
import {withRouter} from "react-router-dom";
import axios from "axios";
import DismissableAlert from "./DismissableAlert";

class ExpertProfileLoginForm extends React.Component {
    state = {
        name: "",
        password: "",

        errorMessage: ""
    };

    onLoginIn = e => {
        e.preventDefault();

        axios.post("http://localhost:8080/api/expertLogin", {
            name: this.state.name,
            password: this.state.password
        })
            .then(res => {
                // Go to /profile
                this.props.history.push({
                    pathname: "/profile",
                    state: {
                        expert: JSON.stringify(res.data)
                    }
                });
            })
            .catch(err => {
                this.setState({
                    errorMessage: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data
                });
            });
    };

    render() {
        return (
            <form onSubmit={this.onLoginIn}>
                <h2 className="heading mb-5 pb_font-40">Logowanie do profilu fachowca</h2>

                <div className="form-group">
                    <input className="form-control" onChange={e => this.setState({name: e.target.value})} type="text" placeholder="Imię i nazwisko lub nazwa firmy" required="required"/>
                </div>

                <div className="form-group">
                    <input className="form-control" onChange={e => this.setState({password: e.target.value})} type="password" placeholder="Hasło" required="required"/>
                </div>

                <div className="form-group">
                    <input type="submit"
                           className="btn btn-primary btn-lg btn-block pb_btn-pill  btn-shadow-blue"
                           value="Zaloguj się"/>
                </div>

                {this.state.errorMessage !== "" && <DismissableAlert key={Math.random()} content={this.state.errorMessage} dismiss={3} dismissCallback={() => this.setState({errorMessage: ""})}/>}
            </form>
        );
    }
}

export default withRouter(ExpertProfileLoginForm);
