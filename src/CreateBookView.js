import React, { Component } from 'react';

export default class CreateBookView extends Component {
    render() {
        return (
            <form className="create-book-form" onSubmit={this.submitForm.bind(this)}>
                <h1>Create Book</h1>
                <label>
                    <div>Title:</div>
                    <input type="text" name="title" required
                        ref={e => this.titleField = e} />
                </label>
                <label>
                    <div>Short description:</div>
                    <input type="text" name="description" required
                       ref={e => this.descriptionField = e} />
                </label>
                <label>
                    <div>Article:</div>
                    <textarea name="article" rows="10"
                        ref={e => this.articleField = e} />
                </label>
                <div>
                    <input type="submit" value="Create" />
                </div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.descriptionField.value,
            this.articleField.value
        );
    }
}
