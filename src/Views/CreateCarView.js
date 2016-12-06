import React, { Component } from 'react';
import './FormViews.css'
import '../App.css'

export default class CreateCarView extends Component {
    render() {
            return (
                <form className="create-book-form" onSubmit={this.submitForm.bind(this)}>
                    <br/><br/>
                    <h1>Create Car</h1>
                    <div>
                        <label>Brand:</label>
                        <input type="text" name="brand" className="form" required
                               ref={e => this.brandField = e}/>
                        <label>Model:</label>
                        <input type="text" name="model" className="form" required
                               ref={e => this.modelField = e}/>
                        <label>Picture Url:</label>
                        <input type="text" name="picture" className="form" required
                               ref={e => this.pictureUrlField = e}/>
                        <label>Price:</label>
                    <input type="text" rows="25" name="price" className="form" required
                              ref={e => this.priceField = e}/>
                    </div>
                    <input type="submit" value="Create" className="form-btn semibold"/>
                    <div className="clear"></div>
                </form>
            );
    }

    submitForm(event) {
        event.preventDefault();
        this.props.onsubmit(
            this.brandField.value,
            this.modelField.value,
            this.pictureUrlField.value,
            this.priceField.value
        );
    }
}
