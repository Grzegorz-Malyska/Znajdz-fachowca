import React from "react";
import axios from "axios";
import Select from "react-select";
import DismissableAlert from "./DismissableAlert";

class ExpertRegistrationForm extends React.Component {
    state = {
        categoriesLoading: true,
        categoriesError: null,
        categories: [],

        expertName: "",
        expertPassword: "",
        expertPrivatePerson: true,
        expertDescription: "",
        expertEmail: "",
        expertAddress: "",
        expertPostcode: "",
        expertCity: "",
        expertPhoneNumber: "",
        expertImage: "",
        expertCategories: [],

        registrationErrorMessage: "",
        registrationSuccess: false,

        errorMessage: null,
        clearCategoriesList: false
    };

    componentDidMount() {
        axios.get("http://localhost:8080/api/categories")
            .then(res => this.setState({
                categoriesLoading: false,
                categories: res.data
            }))
            .catch(err => this.setState({
                categoriesLoading: false,
                categoriesError: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data
            }));
    }

    onRegisterExpert = e => {
        e.preventDefault();
        console.log(this.state);

        let formElement = e.target;

        if(this.state.expertCategories.length === 0) {
            this.setState({errorMessage: "Musisz wybrać przynajmniej jedną kategorię!"});
            return;
        }

        let mappedToObjectsCategories = [];
        for(let i = 0; i < this.state.expertCategories.length;i++) {
            mappedToObjectsCategories.push({
                name: this.state.expertCategories[i]
            });
        }

        axios.post("http://localhost:8080/api/expert", {
            image: this.state.expertImage,
            categories: mappedToObjectsCategories,
            name: this.state.expertName,
            password: this.state.expertPassword,
            description: this.state.expertDescription,
            address: this.state.expertAddress,
            city: this.state.expertCity,
            postCode: this.state.expertPostcode,
            phoneNumber: this.state.expertPhoneNumber,
            email: this.state.expertEmail,
            privatePerson: this.state.expertPrivatePerson,
            rates: null
        })
            .then(() => {
                this.setState({registrationSuccess: true, clearCategoriesList: true});
                formElement.reset();
            })
            .catch(err => this.setState({registrationSuccess: false, registrationErrorMessage: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data}));
    };

    render() {
        let categoryListHtml;
        if(this.state.categoriesLoading) {
            categoryListHtml = <p>Ładowanie kategorii...</p>;
        } else if(this.state.categoriesError !== null) {
            categoryListHtml = <p className="text-center">{this.state.categoriesError}</p>;
        } else {
            let options = this.state.categories.map(cat => {return {value: cat, label: cat}});

            categoryListHtml = (
                <div className="form-group">
                    <label htmlFor="registrationCategoriesList" className="text-center">Wybierz kategorie swoich usług</label>
                    <Select id="registrationCategoriesList" key={this.state.clearCategoriesList ? Math.random() : 1} options={options}
                            onChange={selectedOptions => {
                                let selectedOptionsFiltered = [];
                                for(let i = 0; i < selectedOptions.length;i++) {
                                    selectedOptionsFiltered.push(selectedOptions[i].value);
                                }

                                this.setState({expertCategories: selectedOptionsFiltered});
                            }}
                            isMulti={true} isSearchable={true} placeholder="Brak wybranych kategorii..." />
                </div>);
        }

        if(this.state.clearCategoriesList === true) {
            this.setState({clearCategoriesList: false});
        }

        return (
            <form onSubmit={this.onRegisterExpert} className="bg-white rounded pb_form_v1">
                <h2 className="mb-4 mt-0 text-center">Zarejestruj się za darmo</h2>
                <div className="form-group">
                    <input type="text" className="form-control py-3 reverse" placeholder="Imię i nazwisko lub nazwa firmy" required="required" onChange={e => this.setState({expertName: e.target.value})}/>
                </div>
                <div className="checkbox">
                    <label><input type="checkbox" defaultChecked={true} onChange={e => this.setState({expertPrivatePerson: e.target.checked})}/>Osoba prywatna</label>
                </div>
                <div className="form-group">
                    <input type="password" className="form-control py-3 reverse" placeholder="Hasło do profilu" required="required" onChange={e => this.setState({expertPassword: e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control py-3 reverse" placeholder="Opis" required="required" onChange={e => this.setState({expertDescription: e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control py-3 reverse" placeholder="Email" required="required" onChange={e => this.setState({expertEmail: e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control py-3 reverse" placeholder="Ulica i numer domu/mieszkania" required="required" onChange={e => this.setState({expertAddress: e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control py-3 reverse" placeholder="Kod pocztowy" required="required" onChange={e => this.setState({expertPostcode: e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control py-3 reverse" placeholder="Miasto" required="required" onChange={e => this.setState({expertCity: e.target.value})}/>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control py-3 reverse" placeholder="Telefon kontaktowy" required="required" onChange={e => this.setState({expertPhoneNumber: e.target.value})}/>
                </div>
                <div className="form-group">
                    <label>Wybierz zdjęcie profilowe <input type="file" className="form-control-file" accept="image/png" required="required" onChange={e => {
                        let file = e.target.files[0];

                        if(file.type !== "image/png") {
                            this.setState({errorMessage: "Zły format zdjęcia profilowego!"});
                            e.target.value = "";        // get rid of file with wrong type
                            return;
                        }

                        let fileReader = new FileReader();
                        fileReader.readAsBinaryString(file);
                        fileReader.onload = () => this.setState({expertImage: btoa(fileReader.result)});
                    }}/></label>
                </div>
                {categoryListHtml}

                <div className="form-group">
                    <input type="submit"
                           className="btn btn-primary btn-lg btn-block pb_btn-pill  btn-shadow-blue"
                           value="Zarejestruj się"/>
                </div>

                <br /><br />
                {this.state.errorMessage !== null && <DismissableAlert dismiss={3} dismissCallback={() => this.setState({errorMessage: null})} key={Math.random()} content={this.state.errorMessage} />}
                {this.state.registrationSuccess ? <DismissableAlert dismiss={3} dismissCallback={() => this.setState({registrationSuccess: false})} key={Math.random()} content="Pomyślnie zarejestrowano fachowca!" /> :
                    (this.state.registrationErrorMessage !== "" ? <DismissableAlert dismiss={3} dismissCallback={() => this.setState({registrationErrorMessage: ""})} key={Math.random()} content={this.state.registrationErrorMessage} /> : null)}
            </form>
        );
    }
}

export default ExpertRegistrationForm;
