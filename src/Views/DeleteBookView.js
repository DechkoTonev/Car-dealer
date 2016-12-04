import React, { Component } from 'react';
import './FormViews.css'

export default class DeleteBookView extends Component {
    render() {
        return (
            <form className="delete-book-form" onSubmit={this.submitForm.bind(this)}>
                <br/><br/>
                <h1>Confirm Delete Post</h1>
                <div>
                    <label>Title:</label>
                    <input type="text" name="title" className="form" disabled
                           defaultValue={this.props.title}
                           ref={e => this.titleField = e} />
                    <label>Description:</label>
                    <input type="text" name="description" className="form" disabled
                           ref={e => this.descriptionField = e}
                           defaultValue={this.props.description}/>
                    <label>Picture Url:</label>
                    <input type="text" name="pictureUrl" className="form" disabled
                           ref={e => this.pictureUrlField = e}
                           defaultValue={this.props.imageUrl}/>
                    <label>Article:</label>
                    <textarea name="article" rows="10" className="form" disabled
                              ref={e => this.articleField = e}
                              defaultValue={this.props.article}/>
                    <label>Image:</label>
                    <img role="presentation" className="form" src={this.props.imageUrl} />
                </div>
                <input type="submit" className="form-btn semibold" value="Delete" />
                <div className="clear"></div>
            </form>
        );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(this.props.bookId);
    }
}
