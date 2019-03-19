import React from 'react';

import Navbar from "../components/Navbar";
import ExpertsFindForm from "../components/ExpertsFindForm";
import AppFeature from "../components/AppFeature";
import FaqEntry from "../components/FaqEntry";
import ExpertRegistrationForm from "../components/ExpertRegistrationForm";
import Footer from "../components/Footer";
import ExpertProfileLoginForm from "../components/ExpertProfileLoginForm";

const Home = () => {
    return (
        <div>
            <Navbar />

            {/* main panel with advertisement and search experts form */}
            <section
                className="pb_cover_v3 overflow-hidden cover-bg-indigo cover-bg-opacity text-left pb_gradient_v1 pb_slant-light"
                id="section-home">
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-6">
                            <h2 className="heading mb-3">Znajdź fachowca</h2>
                            <div className="sub-heading">
                                <p className="mb-4">Najlepsi i sprawdzeni specjaliści z każdej branży w twojej okolicy. Dzięki stale rozwijającej sie bazie fachowców znajdziesz firmy oferujące najwyższą jakość usług oraz polecane przez klientów.</p>
                            </div>
                        </div>
                        <div className="col-md-1">
                        </div>
                        <div className="col-md-5 relative align-self-center">
                            <ExpertsFindForm />
                        </div>
                    </div>
                </div>
            </section>

            {/*app features panel */}
            <section className="pb_section bg-light pb_slant-white pb_pb-250" id="section-features">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-6 text-center mb-5">
                            <h5 className="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2">
                                <strong>Funkcjonalności</strong></h5>
                            <h2>Możliwości i funkcjonalności aplikacji</h2>
                        </div>
                    </div>
                    <div className="row">
                        <AppFeature featureIconClass={"fas fa-map-marked-alt"} featureName={"Twoja okolica"} featureDescription={"Szukając fachowca możesz wybrać lokalizację, gdzie usługa ma być wykonana, wyświelona zostanie lista fachowców świadczących usługi w twojej okolicy. Jeśli jesteś fachowcem możesz wybrać miasto lub region w którym świadczysz usługi."} />
                        <AppFeature featureIconClass={"fas fa-star-half-alt"} featureName={"Opinie użytkowników"} featureDescription={"Możliwość oceniania fachowców oraz jakości świadczonych przez nich usług w skali od 1 do 5 oraz dodawania opinii. Ze strony fachowca możliwość odpowiadania na opinie klientów."} />
                        <AppFeature featureIconClass={"fab fa-telegram-plane"} featureName={"Łatwy kontakt"} featureDescription={"Możliwość wysłania fachowcowi wiadomości."} />
                        <AppFeature featureIconClass={"fas fa-users"} featureName={"Stale rozwijająca się społeczność"} featureDescription={"Aplikacja rozwija się z dnia na dzień. Ilość fachowców w twojej okolicy oraz opinii użytkowników stale rośnie tworząc użyteczną bazę danych, dzięki której znajdziesz porządnego specjalistę."} />
                    </div>
                </div>
            </section>

            {/* faq */}
            <section className="pb_section pb_slant-white" id="section-faq">
                <div className="container">
                    <div className="row justify-content-center mb-5">
                        <div className="col-md-6 text-center mb-5">
                            <h5 className="text-uppercase pb_font-15 mb-2 pb_color-dark-opacity-3 pb_letter-spacing-2">
                                <strong>FAQ</strong></h5>
                            <h2>Frequently Asked Questions, czyli często zadawane pytania</h2>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-md">
                            <div id="pb_faq" className="pb_accordion" data-children=".item">
                                <FaqEntry index={0} question={"Jak założyć konto?"} answer={"Należy przejść do panelu rejerstracji, a następnie wybrać wprowadzić potrzebne dane."} />
                                <FaqEntry index={1} question={"Jak mogę sprawdzić opinie o danym fachowcu?"} answer={"Opinie fachowca można sprawdzić po jego wyszukaniu w karcie."} />
                                <FaqEntry index={2} question={"Jak mogę wystawić opinię?"} answer={"Należy wejść na profil fachowca poprzez jego wyszukanie, a następnie kliknąć na pole dodaj opinie, gdzie pojawi się możliwość wyboru oceny w skali od 1 do 5 oraz dodania uzasadnienia opinii."} />
                                <FaqEntry index={3} question={"W jaki sposób mogę skontaktować się z fachowcem?"} answer={"Po wyszukaniu fachowca na jego karcie znajdziesz kontakt telefoniczny i mailowy."} />
                                <FaqEntry index={4} question={"Czy moje dane są udostępniane innym firmom?"} answer={"Państwa dane są przechowywane wyłącznie na tej stronie i służą do logowania i kontaktu z klientem bądź fachowcem."} />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="pb_xl_py_cover overflow-hidden pb_slant-light pb_gradient_v1 cover-bg-opacity-8"
                     style={{backgroundImage: "url(assets/images/1900x1200_img_5.jpg)"}}>
                <div className="container">
                    <div className="row align-items-center justify-content-center">
                        <div className="col-md-5 justify-content-center">
                            <h2 className="heading mb-5 pb_font-40">Jesteś fachowcem?</h2>
                            <div className="sub-heading">
                                <p className="mb-4">Zarejestruj się i dołącz do największej w Polsce społeczności fachowców!</p>
                            </div>
                            <ExpertProfileLoginForm />
                        </div>
                        <div className="col-md-1"></div>
                        <div className="col-md-5">
                            <ExpertRegistrationForm />
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </div>
    );
};

export default Home;
