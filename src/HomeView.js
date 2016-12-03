import React, { Component } from 'react';

export default class HomeView extends Component {
    render() {
        let imageUrl = []
        imageUrl[0] = require('../img/home/1.jpg')
        imageUrl[1] = require('../img/home/2.jpg')
        imageUrl[2] = require('../img/home/3.jpg')

        return (
            <div className="home-view">
                <div id="headerwrap" className="home-view" name="home">
                    <header className="clearfix">
                        <p id="home-page-p">Audi Innovation Research</p>
                        <h1>The future start today</h1>

                    </header>
                </div>
                <div id="greywrap">
                    <div className="row">
                        <div className="col-lg-4 callout">
                            <h2>New Audi A7</h2>
                            <p>Top sporting performance. Innovative technology. Impressive efficiency. The Audi A7 Sportback. A unique car.</p>
                            <img role="presentation" className="img-responsive" src={imageUrl[0]} width="460" height="345" />
                        </div>

                        <div className="col-lg-4 callout">
                            <h2>The Audi A3 Sportback e-tron and Q7 e-tron quattro</h2>
                            <p>The Audi A3 Sportback e-tron and Q7 e-tron quattro bring an electric engine together with a TFSI- or TDI combustion engine and efficiently combine the benefits of both.</p>
                            <img role="presentation" className="img-responsive" src={imageUrl[1]} width="460" height="345" />
                        </div>

                        <div className="col-lg-4 callout">
                            <h2>"Cars are increasingly becoming part of a digital eco system."</h2>
                            <p>At the Electronics Research Lab in Silicon Valley, experts from a variety of disciplines are engineering the future of mobility.</p>
                            <img role="presentation" className="img-responsive" src={imageUrl[2]} width="460" height="345" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
