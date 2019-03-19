import React from 'react';
import {Redirect, Link} from "react-router-dom";
import {withRouter} from "react-router-dom";
import DismissableAlert from "../components/DismissableAlert";
import axios from "axios/index";
import Select from "react-select";
import ExpertPrivateMessage from "../components/ExpertPrivateMessage";

class ExpertProfile extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            expert: this.props.location.state === undefined ? null : JSON.parse(this.props.location.state.expert),
            categories: [],

            newExpertImage: null,

            newExpertName: null,
            newExpertPassword: null,
            newExpertDescription: null,
            newExpertAddress: null,
            newExpertCity: null,
            newExpertPostCode: null,
            newExpertPhoneNumber: null,
            newExpertEmail: null,
            newExpertCategories: null,

            errorMessage: null,
            registrationSuccess: false
        };

        this.onExpertDataUpdate = this.onExpertDataUpdate.bind(this);
        this.onExpertPrivateMessageDismiss = this.onExpertPrivateMessageDismiss.bind(this);
    }

    componentDidMount() {
        axios.get("http://localhost:8080/api/categories")
            .then(res => this.setState({
                categories: res.data
            }))
            .catch(err => this.setState({
                errorMessage: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data
            }));
    }

    onExpertPrivateMessageDismiss(message) {
        let expert = this.state.expert;
        let messageObject = JSON.parse(message);

        expert.expertMessages = expert.expertMessages
            .filter(msg => !(msg.senderName === messageObject.senderName && msg.content === messageObject.content));

        this.setState({expert: expert});
    }

    onExpertDataUpdate(e) {
        e.preventDefault();

        if(this.state.newExpertImage === null &&
            this.state.newExpertCategories === null &&
            this.state.newExpertName === null &&
            this.state.newExpertPassword === null &&
            this.state.newExpertDescription === null &&
            this.state.newExpertAddress === null &&
            this.state.newExpertCity === null &&
            this.state.newExpertPostCode === null &&
            this.state.newExpertPhoneNumber === null &&
            this.state.newExpertEmail === null) {
            // no update
            return;
        }

        console.log(this.state);
        axios.put("http://localhost:8080/api/expert/update/" + this.state.expert.name, {
            image: this.state.newExpertImage,
            categories: this.state.newExpertCategories,
            name: this.state.newExpertName,
            password: this.state.newExpertPassword,
            description: this.state.newExpertDescription,
            address: this.state.newExpertAddress,
            city: this.state.newExpertCity,
            postCode: this.state.newExpertPostCode,
            phoneNumber: this.state.newExpertPhoneNumber,
            email: this.state.newExpertEmail
        })
        .then(() => {
            this.setState({
                registrationSuccess: true
            });

            this.refreshExpertDataAfterUpdate();
        })
        .catch(err => this.setState({errorMessage: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data}));
    }

    refreshExpertDataAfterUpdate() {
        axios.post("http://localhost:8080/api/expertLogin", {
            name: this.state.newExpertName === null ? this.state.expert.name : this.state.newExpertName,
            password: this.state.newExpertPassword === null ? this.state.expert.password : this.state.newExpertPassword
        })
            .then(res => this.setState({expert: res.data}))
            .catch(err => {
                this.setState({
                    errorMessage: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data
                });
            });
    }

    render() {
        if(this.props.location.state === undefined) {
            return <Redirect to="/"/>;
        }

        let expert = this.state.expert;

        let options = this.state.categories.map(catName => {return {value: catName, label: catName}});
        return (
            <div>
            <nav className="navbar navbar-inverse navbar-expand-lg navbar-header fixed-top">
                <div className="container">
                    <Link className="navbar-brand" style={{position: "absolute",
                        width: "100%",
                        left: "0",
                        margin: "auto",
                        marginTop: "5px",
                        marginLeft: "48%"}} to="/"><h3>Strona główna</h3></Link>
                </div>
            </nav>
            <div className="container bootstrap snippet">
                <div className="row">
                    <div className="col-sm-10"><h1>{expert.privatePerson ? expert.name : (`Firma ` + expert.name)}</h1>
                    </div>
                    <div className="col-sm-2"><span className="pull-right"><img title="Zdjęcie profilowe"
                                                                                alt="Zdjęcie profilowe"
                                                                                className="img-circle img-responsive"
                                                                                style={{
                                                                                    width: "200px",
                                                                                    height: "200px"
                                                                                }}
                                                                                src={"data:image/png;base64," + expert.image}/></span>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3">
                        <div className="text-center">
                            <img
                                src={this.state.newExpertImage !== null ? "data:image/png;base64," + this.state.newExpertImage : "http://ssl.gstatic.com/accounts/ui/avatar_2x.png"}
                                className="avatar img-circle img-thumbnail" alt="Zdjęcie profilowe"/>
                            <h6>Zmień zdjęcie profilowe</h6>
                            <input type="file" className="text-center center-block file-upload" accept="image/png"
                                   onChange={e => {
                                       let file = e.target.files[0];

                                       if (file.type !== "image/png") {
                                           this.setState({errorMessage: "Zły format zdjęcia profilowego!"});
                                           e.target.value = "";        // get rid of file with wrong type
                                           return;
                                       }

                                       let fileReader = new FileReader();
                                       fileReader.readAsBinaryString(file);
                                       fileReader.onload = () => this.setState({newExpertImage: btoa(fileReader.result)});
                                   }}/>
                        </div>

                        <hr/>
                        <br/>

                        <ul className="list-group">
                            <li className="list-group-item text-muted">Statystyki</li>
                            <li className="list-group-item text-right"><span
                                className="pull-left"><strong>Ocen </strong></span> {expert.rates.length}</li>
                            <li className="list-group-item text-right"><span
                                className="pull-left"><strong>Średnia ocen </strong></span> {ExpertProfile.calculateAverage(expert.rates)}
                            </li>
                        </ul>

                        <br />
                        <br />

                        <h3 className="text-center">Prywatne wiadomości</h3>
                        <ul className="list-group">
                            {expert.expertMessages.length === 0 ? <p>Brak wiadomości</p> : expert.expertMessages.map(msg => <ExpertPrivateMessage expertName={expert.name} onPrivateMessageDismiss={this.onExpertPrivateMessageDismiss} key={Math.random()} message={JSON.stringify(msg)} />)}
                        </ul>
                    </div>
                    <div className="col-sm-9">
                        <div className="tab-content">
                            <div className="tab-pane active">
                                <hr/>
                                <form className="form" onSubmit={this.onExpertDataUpdate}>
                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>{expert.privatePerson ? "Imię i nazwisko" : "Nazwa firmy"}</h4>
                                                <input type="text" className="form-control"
                                                       onChange={e => this.setState({newExpertName: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.name}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>Hasło</h4>
                                                <input type="password" className="form-control"
                                                       onChange={e => this.setState({newExpertPassword: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.password}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>Opis</h4>
                                                <input type="text" className="form-control"
                                                       onChange={e => this.setState({newExpertDescription: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.description}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>Adres</h4>
                                                <input type="text" className="form-control"
                                                       onChange={e => this.setState({newExpertAddress: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.address}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>Miasto</h4>
                                                <input type="text" className="form-control"
                                                       onChange={e => this.setState({newExpertCity: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.city}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>Kod pocztowy</h4>
                                                <input type="text" className="form-control"
                                                       onChange={e => this.setState({newExpertPostCode: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.postCode}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>Numer telefonu kontaktowego</h4>
                                                <input type="text" className="form-control"
                                                       onChange={e => this.setState({newExpertPhoneNumber: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.phoneNumber}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-6">
                                            <label><h4>Email</h4>
                                                <input type="text" className="form-control"
                                                       onChange={e => this.setState({newExpertEmail: e.target.value === "" ? null : e.target.value})}
                                                       placeholder={expert.email}/></label>
                                        </div>
                                    </div>

                                    <div className="form-group">
                                        <label htmlFor="expertProfileCategoriesUpdate"><h4>Kategorie</h4></label>
                                        <p>{expert.categories.map(cat => cat.name + " ")}</p>

                                        <Select id="expertProfileCategoriesUpdate" options={options}
                                                onChange={selectedOptions => {
                                                    let selectedOptionsFiltered = [];
                                                    for(let i = 0; i < selectedOptions.length;i++) {
                                                        selectedOptionsFiltered.push(selectedOptions[i].value);
                                                    }

                                                    this.setState({newExpertCategories: selectedOptionsFiltered.length === 0 ? null : selectedOptionsFiltered});
                                                }}
                                                isMulti={true} isSearchable={true} placeholder="Brak wybranych kategorii..." />
                                    </div>

                                    <div className="form-group">
                                        <div className="col-xs-12">
                                            <br/>
                                            <button className="btn btn-lg btn-success" type="submit"><i
                                                className="glyphicon glyphicon-ok-sign"/> Aktualizuj dane
                                            </button>
                                            &nbsp;&nbsp;&nbsp;&nbsp;
                                            <button className="btn btn-lg" type="reset"><i
                                                className="glyphicon glyphicon-repeat"/> Wyczyść formularz
                                            </button>
                                        </div>
                                    </div>

                                    <br/><br/>
                                    {this.state.errorMessage !== null && <DismissableAlert dismiss={3}
                                                                                           dismissCallback={() => this.setState({errorMessage: null})}
                                                                                           key={Math.random()}
                                                                                           content={this.state.errorMessage}/>}
                                    {this.state.registrationSuccess && <DismissableAlert dismiss={3} dismissCallback={() => this.setState({registrationSuccess: false})} key={Math.random()} content="Pomyślnie zaktualizowane dane!" />}
                                </form>

                                <hr/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        );
    }

    static calculateAverage(arr) {
        if (arr.length === 0) {
            return 0;
        }

        let sum = 0;

        for (let i = 0; i < arr.length; i++) {
            sum += arr[i].rate;
        }

        return (Math.round((sum / arr.length) * 100) / 100);
    }
}

export default withRouter(ExpertProfile);
