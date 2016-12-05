import React, { Component } from 'react';
import './FormViews.css'
import '../App.css'

export default class CreateBookView extends Component {
    render() {
        return (
            <form className="create-book-form" onSubmit={this.submitForm.bind(this)}>
                <br/><br/>
                <h1>Create Post</h1>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" className="form" required
                           ref={e => this.titleField = e} />
                    <label>Description:</label>
                    <input type="text" name="description" className="form" required
                           ref={e => this.descriptionField = e} />
                    <label>Picture Url:</label>
                    <input type="text" name="title" className="form" required
                           ref={e => this.pictureUrlField = e} />
                    <label>Article:</label>
                    <textarea type="text" rows="25" name="article" className="form" required
                           ref={e => this.articleField = e} />
                </div>
                <input type="submit" value="Create" className="form-btn semibold" />
                <div className="clear"></div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.titleField.value,
            this.descriptionField.value,
            this.pictureUrlField.value,
            this.articleField.value
        );
    }
}
