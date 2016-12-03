import React, { Component } from 'react';
import './HomeView.css';

export default class HomeView extends Component {
    render() {
        let articlesForHomeView = this.props.posts.map(post =>
                <div className="col-lg-4 callout">
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <img role="presentation" className="img-responsive" src={post.imageUrl} width="460" height="345" />
                </div>
        );

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
                        {articlesForHomeView}
                    </div>
                </div>
            </div>
        );
    }
}
