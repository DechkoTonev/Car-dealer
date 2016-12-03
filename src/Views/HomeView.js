import React, { Component } from 'react';

export default class HomeView extends Component {
    render() {
        return (
            <div className="home-view">
                <div id="headerwrap" className="home-view" name="home">
                    <header className="clearfix">
                        <h1>Welcome to our agency</h1>
                        { this.props.username ?
                            <p>Hello, {this.props.username}.</p> :
                            <p>You can choose what vacation you would like to purchase.</p>
                        }
                    </header>
                </div>
                <div id="greywrap">
                    <div className="row">
                        <div className="col-lg-4 callout">
                            <span className="icon icon-stack"></span>
                            <h2>Bootstrap 3</h2>
                            <p>Shield Theme is powered by Bootstrap 3. The incredible Mobile First Framework is the best option to run your website. </p>
                        </div>

                        <div className="col-lg-4 callout">
                            <span className="icon icon-eye"></span>
                            <h2>Retina Ready</h2>
                            <p>You can use this iPhone, iPad or MacBook Pro. This theme is retina ready and that is awesome. </p>
                        </div>

                        <div className="col-lg-4 callout">
                            <span className="icon icon-heart"></span>
                            <h2>Crafted with Love</h2>
                            <p>We don't make sites, we craft themes with love & passion. That is our most valued secret. We only do thing that we love.   </p>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
