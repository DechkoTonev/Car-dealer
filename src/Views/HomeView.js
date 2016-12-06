import React, { Component } from 'react';
import './HomeView.css';

export default class HomeView extends Component {
    render() {
        let articlesForHomeView = ''
        let username = this.props.username;
        if (username != null) {
            articlesForHomeView = this.props.posts.map(post =>
                <div key={post._id} className="col-xs-4 callout">
                    <div className="article-container">
                        <div className="carImage">
                            <img role="presentation" className="img-responsive" src={post.imageUrl}/>
                        </div>
                        <h2>{post.title}</h2>
                        <p>{post.description}</p>
                        <input type="button" value="Read more.." className="form-btn-home"
                               onClick={this.props.readArticleClicked.bind(this, post._id)}/>
                    </div>
                </div>
            );
        } else {
            articlesForHomeView = ""
        }



    return (
            <div className="home-view">
                <div id="headerwrap" className="home-view" name="home">
                    <header className="clearfix">
                        <p id="home-page-p">Audi Innovation Research</p>
                        <h1>The future starts today</h1>
                    </header>
                </div>
                <div className="col-lg-offset-1 col-lg-10  col-sm-offset-1 col-sm-10 col-xs-12 text-center margin-video">
                    <h2 className="margin-top-0 text-primary">King of the road "Audi - The Comeback"</h2>
                    <br/>
                    <iframe width="100%" height="720px"  src="https://www.youtube.com/embed/tyOEUXqqiVU?controls=0">
                    </iframe>
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
