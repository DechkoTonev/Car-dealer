import React, { Component } from 'react';

export default class EditBookView extends Component {
    render() {
        return (
            <form className="edit-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Edit Book</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} />
                </label>
                <label>
                    <div>Short description:</div>
                    <input type="text" name="description" required
                           ref={e => this.descriptionField = e}
                           defaultValue={this.props.description}/>
                </label>
                <label>
                    <div>Article:</div>
                    <textarea name="article" rows="10" required
                              ref={e => this.articleField = e}
                              defaultValue={this.props.article}/>
                </label>
                <label>
                    <div>URL of picture:</div>
                    <input name="pictureUrl" required
                           ref={e => this.pictureUrlField = e}
                           defaultValue={this.props.imageUrl}/>
                    <img src={this.props.imageUrl} width="240px" />
                </label>
                <div>
                    <input type="submit" value="Edit" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.props.bookId,
            this.titleField.value,
            this.descriptionField.value,
            this.articleField.value,
            this.pictureUrlField.value
        );
    }
}
