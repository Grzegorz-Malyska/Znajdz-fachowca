import React from 'react';
import axios from "axios";
import {withRouter} from "react-router-dom";

import DismissableAlert from "./DismissableAlert";

class ExpertsFindForm extends React.Component {
    state = {
        categoriesLoading: true,
        categoriesError: null,
        categories: [],
        expertsFindRequirements: {
            city: "",
            category: ""
        },
        expertsLoading: false,
        expertsError: null,
        expertsLoaded: null
    };

    componentDidMount() {
        this.categorySelect = document.getElementById("expertFindFormCategorySelect");

        axios.get("http://localhost:8080/api/categories")
            .then(res => this.setState({
                categoriesLoading: false,
                categories: res.data,
                expertsFindRequirements: {
                    city: this.state.expertsFindRequirements.city,
                    category:
                        res.data[this.categorySelect.selectedIndex]
                }
            }))
            .catch(err => this.setState({
                categoriesLoading: false,
                categoriesError: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data
            }));
    }

    render() {
        let categoryListContent;
        if(this.state.categoriesLoading) {
            categoryListContent = <option value="">Ładowanie kategorii...</option>;
        } else if(this.state.categoriesError !== null) {
            categoryListContent = <option value="">{this.state.categoriesError}</option>;
        } else {
            categoryListContent = this.state.categories.map(cat => <option key={cat} value={cat}>{cat}</option>);
        }

        let expertsFindResultAlertContent = null;
        if(this.state.expertsLoading) {
            expertsFindResultAlertContent = "Pobieranie fachowców...";
        } else if(this.state.expertsError !== null) {
            expertsFindResultAlertContent = this.state.expertsError;
        } else if(this.state.expertsLoaded !== null) {
            if(this.state.expertsLoaded.length === 0) {
                expertsFindResultAlertContent = "Brak fachowców spełniających podane kryteria";
            }
        }

        return (
            <form onSubmit={this.onExpertsFindAction} className="bg-white rounded pb_form_v1">
                <h2 className="mb-4 mt-0 text-center">Potrzebujesz fachowca?</h2>
                <div className="form-group">
                    <input onChange={e => this.setState({expertsFindRequirements: {city: e.target.value, category: this.state.expertsFindRequirements.category}})} type="text" className="form-control pb_height-50 reverse"
                           placeholder="Miasto" required="required"/>
                </div>
                <div className="form-group">
                    <div className="pb_select-wrap">
                        <select onChange={() => this.setState({expertsFindRequirements:
                                {city: this.state.expertsFindRequirements.city, category: this.state.categories[this.categorySelect.selectedIndex]}
                                })} id="expertFindFormCategorySelect" name="category" className="form-control pb_height-50 reverse">
                            {categoryListContent}
                        </select>
                    </div>
                </div>
                <div className="form-group">
                    <input type="submit"
                           className="btn btn-primary btn-lg btn-block pb_btn-pill  btn-shadow-blue"
                           value="Szukaj!"/>
                </div>

                {expertsFindResultAlertContent !== null && <DismissableAlert key={Math.random()} content={expertsFindResultAlertContent} />}
            </form>
        );
    }

    onExpertsFindAction = e => {
        e.preventDefault();

        this.setState({expertsLoading: true, expertsError: null, expertsLoaded: null});

        axios.get("http://localhost:8080/api/expert", {
            params: this.state.expertsFindRequirements
        })
            .then(res => {
                this.setState({
                    expertsLoading: false,
                    expertsLoaded: res.data
                });

                if(res.data.length !== 0) {
                    // Go to /results
                    this.props.history.push({
                        pathname: "/results",
                        state: {
                            experts: res.data,
                            city: this.state.expertsFindRequirements.city,
                            category: this.state.expertsFindRequirements.category
                        }
                    });
                }
            })
            .catch(err => this.setState({
                expertsLoading: false,
                expertsError: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data
            }));
    }
}

export default withRouter(ExpertsFindForm);
