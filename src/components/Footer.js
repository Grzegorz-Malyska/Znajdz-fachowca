import React from "react";

const Footer = () => {
    return (
        <footer className="pb_footer bg-light" role="contentinfo">
            <div className="container">
                <div className="row">
                    <div className="col text-center">
                        <p className="pb_font-14">&copy; 2018 <b>Addiction</b> company. Wszelkie prawa zastrzeżone. <br/>
                        <b>Wykonane przez</b>: <u>[KNP] Grzegorz "gjm" Małyska</u>, <u>Bartek "blm" Mitkowski</u>.</p>
                        <p className="pb_font-14">Skontaktuj się z nami pod adresem mailowym <a href="mailto:znajdzfachowcateam@gmail.com">znajdzfachowcateam@gmail.com</a></p>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
