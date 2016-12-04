import React, { Component } from 'react';
import './FormViews.css'

export default class EditBookView extends Component {
    render() {
        return (
            <form className="edit-book-form" onSubmit={this.submitForm.bind(this)}>
                <br/><br/>
                <h1>Edit Post</h1>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" className="form" required
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} />
                    <label>Description:</label>
                    <input type="text" name="description" className="form" required
                           ref={e => this.descriptionField = e}
                           defaultValue={this.props.description}/>
                    <label>Picture Url:</label>
                    <input type="text" name="pictureUrl" className="form" required
                           ref={e => this.pictureUrlField = e}
                           defaultValue={this.props.imageUrl}/>
                    <label>Article:</label>
                    <textarea name="article" rows="25" className="form" required
                    ref={e => this.articleField = e}
                    defaultValue={this.props.article}/>
                    <label>Image:</label>
                    <img role="presentation" className="form" src={this.props.imageUrl}  />
                </div>
                <input type="submit" className="form-btn semibold" value="Edit" />
                <div className="clear"></div>
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
