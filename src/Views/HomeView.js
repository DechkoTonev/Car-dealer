import React, { Component } from 'react';
import './HomeView.css';

export default class HomeView extends Component {
    render() {
        let articlesForHomeView = this.props.posts.map(post =>
            <div className="col-xs-4 callout">
                <div className="carImage">
                    <img role="presentation" className="img-responsive" src={post.imageUrl} />
                </div>
                <h2>{post.title}</h2>
                <p>{post.description}</p>
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
                <div id="greywrap" className="posts">
                    <div className="row">
                        {articlesForHomeView}
                    </div>
                </div>
            </div>
        );
    }
}
