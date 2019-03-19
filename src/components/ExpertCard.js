import React from "react";
import { Card, CardText, CardBody, CardTitle,
            Modal, ModalHeader, ModalBody, ModalFooter} from "reactstrap";
import RateDetails from "./RateDetails";
import DismissableAlert from "./DismissableAlert";
import axios from "axios";
import RatingStarBar from "./RatingStarBar";

class ExpertCard extends React.Component {
    state = {
        modalRateDetailsShow: false,
        modalRateActionShow: false,
        modalSendPrivateMessageShow: false,
        rate: -1,
        rateName: "",
        rateDescription: "",
        addRateMessage: null,
        messageContent: "",
        messageSenderName: "",
        messageSendResultMessage: null
    };

    rateExpertAction = (e, expertName) => {
        e.preventDefault();

        if(this.state.rate === -1 || this.state.rateName === "" || this.state.rateDescription === "") {
            this.setState({
                addRateMessage: "Złe dane dotyczące oceny"
            });
            return;
        }

        axios.put("http://localhost:8080/api/expert/" + expertName, {
            rate: this.state.rate,
            description: this.state.rateDescription,
            raterName: this.state.rateName,
            dateOfAdd: new Date().toISOString(),
            timeOfAdd: new Date().toISOString().substring(0, new Date().toISOString().length - 1)
        })
            .then(() => {
                this.setState({
                    addRateMessage: "Pomyślnie dodano ocenę"
                });

                this.props.refreshExperts();
            })
            .catch(err => this.setState({
                addRateMessage: err.response === undefined ? "Błąd połączenia z serwerem" : err.response.data
            }));
    };

    onPrivateMessageSendAction = e => {
        e.preventDefault();
        let expertObj = JSON.parse(this.props.expert);

        axios.post("http://localhost:8080/api/expert/message/add/" + expertObj.name, {
            senderName: this.state.messageSenderName,
            content: this.state.messageContent
        })
            .then(() => this.setState({messageSendResultMessage: "Wiadomość została wysłana."}))
            .catch(err => {
                if(err.response.status !== 404) {
                    alert("Błąd krytyczny aplikacji!");
                } else {
                    // RuntimeException
                    this.setState({messageSendResultMessage: err.response.data});
                }
            });
    };

    render() {
        const expert = JSON.parse(this.props.expert);
        const starCount = ExpertCard.averageRate(expert.rates);

        let starRatingContent = ExpertCard.generateStarRatingHtmlContent(starCount);

        return (
            <div className="col-auto mb-3">
                <Card style={{width: "20rem"}}>
                    <CardBody>
                        <CardTitle>{expert.privatePerson === true ? expert.name : (`Firma ` + expert.name)}</CardTitle>
                    </CardBody>
                    <img className="img-fluid" src={"data:image/png;base64," + expert.image} alt="Zdjęcie profilowe" />
                    <CardBody>
                        <CardText>{expert.description}</CardText>
                        <hr />
                        <ul className="list-inline">
                            {expert.categories.map(c => <li className="list-inline-item" key={c.name}><span className="text-center">{c.name}</span></li>)}
                        </ul>
                        <hr />
                        <CardText>{expert.address + `,    ` + expert.postCode + `    ` + expert.city}</CardText>
                        <hr />
                        <CardText>{`+48 ` + expert.phoneNumber + `    ` + expert.email}</CardText>
                        <hr />
                        <CardText className="text-center">{starRatingContent}</CardText>
                        <div className="btn-group">
                            <button type="button" className="btn btn-info mr-1" onClick={() => this.setState({modalRateDetailsShow: !this.state.modalRateDetailsShow})}>Szczegóły ocen</button>
                            <button type="button" className="btn btn-info" onClick={() => this.setState({modalRateActionShow: !this.state.modalRateActionShow})}>Oceń fachowca</button>
                        </div>
                        <br />
                        <br />
                        <div className="btn-group">
                            <button type="button" className="btn btn-primary" onClick={() => this.setState({modalSendPrivateMessageShow: !this.state.modalSendPrivateMessageShow})}>Wyślij prywatną wiadomość</button>
                        </div>
                    </CardBody>
                </Card>

                 {/*modals */}
                 {/* Rates' details */}
                <Modal isOpen={this.state.modalRateDetailsShow} toggle={() => this.setState({modalRateDetailsShow: !this.state.modalRateDetailsShow})}>
                    <ModalHeader toggle={() => this.setState({modalRateDetailsShow: !this.state.modalRateDetailsShow})}>Szczegóły ocen fachowca</ModalHeader>
                    <ModalBody>
                        <ul className="list-group">
                            {expert.rates.length === 0 ? <li className="text-center"><b>Brak ocen</b></li> : expert.rates.map(rate => <li key={Math.random() * rate.rate} className="list-group-item"><RateDetails rate={JSON.stringify(rate)} /></li>)}
                        </ul>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => this.setState({modalRateDetailsShow: !this.state.modalRateDetailsShow})}>Zamknij</button>
                    </ModalFooter>
                </Modal>

                {/* Rate expert */}
                <Modal isOpen={this.state.modalRateActionShow} toggle={() => this.setState({modalRateActionShow: !this.state.modalRateActionShow})}>
                    <ModalHeader toggle={() => this.setState({modalRateActionShow: !this.state.modalRateActionShow})}>Ocenianie fachowca</ModalHeader>
                    <ModalBody>
                        <form onSubmit={e => this.rateExpertAction(e, expert.name)}>
                            <div className="form-group">
                                <label htmlFor="expertRateRate">Ocena</label>
                                {/*<input type="text" className="form-control" id="expertRateRate" required="required" onChange={e => this.setState({rate: Number(e.target.value)})} />*/}
                                <RatingStarBar onRateChange={value => this.setState({rate: Number(value)})} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expertRateRateDescription">Opis oceny</label>
                                <input type="text" className="form-control" id="expertRateRateDescription" placeholder="Opis..." required="required" onChange={e => this.setState({rateDescription: e.target.value})} />
                            </div>
                            <div className="form-group">
                                <label htmlFor="expertRateRateName">Podpis</label>
                                <input type="text" className="form-control" id="expertRateRateName" placeholder="Podpis..." required="required" onChange={e => this.setState({rateName: e.target.value})} />
                            </div>
                            <button type="submit" className="btn btn-primary">Wyślij ocenę</button>
                            <br /><br />
                            {this.state.addRateMessage !== null && <DismissableAlert key={Math.random()} dismiss={3} dismissCallback={() => this.setState({addRateMessage: null})} content={this.state.addRateMessage} />}
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => this.setState({modalRateActionShow: !this.state.modalRateActionShow})}>Zamknij</button>
                    </ModalFooter>
                </Modal>

                {/* Private message send */}
                <Modal isOpen={this.state.modalSendPrivateMessageShow} toggle={() => this.setState({modalSendPrivateMessageShow: !this.state.modalSendPrivateMessageShow})}>
                    <ModalHeader toggle={() => this.setState({modalSendPrivateMessageShow: !this.state.modalSendPrivateMessageShow})}>Wysyłanie wiadomośći</ModalHeader>
                    <ModalBody>
                        <form onSubmit={this.onPrivateMessageSendAction}>
                            <div className="form-group">
                                <label>Treść: <input type="text" className="form-control" onChange={e => this.setState({messageContent: e.target.value})} required="required" /></label>
                            </div>
                            <div className="form-group">
                                <label>Podpis: <input type="text" className="form-control" onChange={e => this.setState({messageSenderName: e.target.value})} required="required" /></label>
                            </div>
                            <button type="submit" className="btn btn-primary">Wyślij</button>
                            <br /><br />
                            {this.state.messageSendResultMessage !== null && <DismissableAlert key={Math.random()} dismiss={3} dismissCallback={() => this.setState({messageSendResultMessage: null})} content={this.state.messageSendResultMessage} />}
                        </form>
                    </ModalBody>
                    <ModalFooter>
                        <button className="btn btn-primary" onClick={() => this.setState({modalSendPrivateMessageShow: !this.state.modalSendPrivateMessageShow})}>Zamknij</button>
                    </ModalFooter>
                </Modal>
            </div>
        );
    }

    static generateStarRatingHtmlContent(starCount) {
        let starRatingContent = [];             // <0; 5> stars

        for(let i = 0; i < starCount;i++) {
            starRatingContent.push(<i key={Math.random() * (i + 1)} className={"ion-ios-star text-warning"}/>);
        }
        for(let i = 0; i < (5 - starCount);i++) {
            starRatingContent.push(<i key={Math.random() * (i + 1)} className={"ion-ios-star-outline"} />);
        }

        return starRatingContent;
    }

    static averageRate(rates) {
        let count = rates.length;
        if(count === 0) {
            return 0;
        }

        let sum = 0;

        for(let i = 0; i < count;i++) {
            sum += rates[i].rate;
        }

        return Math.round(sum / (count * 1.0));
    }
}

export default ExpertCard;
