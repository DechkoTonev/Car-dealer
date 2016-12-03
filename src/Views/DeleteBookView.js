import React, { Component } from 'react';

export default class DeleteBookView extends Component {
    render() {
        return (
            <form className="delete-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Confirm Delete Book</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" disabled
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} />
                </label>
                <label>
                    <div>Description:</div>
                    <input type="text" name="description" disabled
                           ref={e => this.descriptionField = e}
                           defaultValue={this.props.description}/>
                </label>
                <label>
                    <div>Article:</div>
                    <textarea name="article" rows="10" disabled
                              ref={e => this.articleField = e}
                              defaultValue={this.props.article}/>
                </label>
                <div>
                    <input type="submit" value="Delete" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(this.props.bookId);
    }
}
