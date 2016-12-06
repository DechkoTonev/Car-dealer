import React, { Component } from 'react';

export default class BooksView extends Component {
    render() {
        let postRows = this.props.books.map(post =>
            <tr key={post._id}>
                <td>{post.title}</td>
                <td>{post.description}</td>
                <td>{post.article}</td>
                <td><img src={post.imageUrl} role="presentation" className="img-responsive" /></td>
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
                    <input type="button" value="Edit"
                        onClick={this.props.editBookClicked.bind(this, post._id)} />
                    &nbsp;
                    <input type="button" value="Delete"
                       onClick={this.props.deleteBookClicked.bind(this, post._id)} />
                </td>
            );
        else
            return <td></td>;
    }
}
