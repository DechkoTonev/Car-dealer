import React, { Component } from 'react';
import './PostsView.css'

export default class PostsView extends Component {
    render() {
        return (
            <div className="container-fluid">
                <br/><br/>
                <div className="row">
                    <div class="col-sm-8">
                        <h2>{this.props.postTitle}</h2><br/>
                        <h4>{this.props.postDescription}</h4><br/>
                        <p>{this.props.postArticle}</p>
                        <img className="image-div" role="presentation" src={this.props.postImageUrl} />
                    </div>
                </div>
            </div>
        );

    }
}
