import React, { Component } from 'react';
import './HomeView.css';

export default class HomeView extends Component {
    render() {
        let articlesForHomeView = this.props.posts.map(post =>
            <div key={post._id} className="col-xs-4 callout">
                <div className="article-container">
                    <div className="carImage">
                        <img role="presentation" className="img-responsive" src={post.imageUrl} />
                    </div>
                    <h2>{post.title}</h2>
                    <p>{post.description}</p>
                    <input type="button" value="Read more.." className="button-home"
                           onClick={this.props.readArticleClicked.bind(this, post._id)} />
                </div>
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
