import React, { Component } from 'react';
import './BooksView.css'
import '../App.css'

export default class BooksView extends Component {
    render() {
        let postRows = this.props.books.map(post =>
            <tr key={post._id} className="table-tr" >
                <td className="title-table">{post.title}</td>
                <td className="description-table">{post.description}</td>
                <td className="article-table">{post.article}</td>
                <td className="image-table" ><img src={post.imageUrl} role="presentation" className="img-responsive" /></td>
                {this.getActions(post, this.props.userId)}
            </tr>
        );

        return (
            <div className="books-view">
                <h1>Posts</h1>
                <table className="books-table">
                    <thead>
                        <tr>
                            <th>Title</th>
                            <th>Description</th>
                            <th>Article</th>
                            <th>Image</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {postRows}
                    </tbody>
                </table>
            </div>
        );
    }

    getActions(post, userId) {
        if (post._acl.creator === userId)
            return (
                <td>
                    <input type="button" value="Edit" className="form-btn-list"
                        onClick={this.props.editBookClicked.bind(this, post._id)} />
                    &nbsp;
                    <input type="button" value="Delete" className="form-btn-list"
                       onClick={this.props.deleteBookClicked.bind(this, post._id)} />
                </td>
            );
        else
            return <td></td>;
    }
}
