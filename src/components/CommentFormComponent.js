import React, {Component, useState} from 'react';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, FormFeedback, Input, Label } from 'reactstrap';
import { NavLink } from 'react-router-dom';


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state= {
            isModalOpen: false,
            name: '',
            touched: {
                name: false
            }
        };

        this.toggleModal = this.toggleModal.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    toggleModal() {
        this.setState({
          isModalOpen: !this.state.isModalOpen
        });
    }

    handleInputChange(event) {
        const target = event.target;
        const value = target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        this.toggleModal();
        alert("Name: " + this.name.value + " Comment: " + this.comment.value
            + " Rating: " + this.rating);
        event.preventDefault();
    }

    handleBlur = (field) => (evt) => {
        this.setState({
            touched: { ...this.state.touched, [field]: true}
        });
    }

    validate(name) {
        const errors = {
            name: ''
        };

        if (this.state.touched.name && name.length <3)
            errors.name = 'Name must be greater than 3 characters';
        else if (this.state.touched.name && name.length > 20)
            errors.name = 'Name must be 15 characters or less';

        return errors;
    }

    render() {
        const errors = this.validate(this.state.name);

        return (
            <div>
                <div className="col-12">
                    <Button color="primary" outline onClick={this.toggleModal}><span className="fa fa-sign-in fa-lg"></span> Submit Comment</Button>
                </div>
                <Modal isOpen={this.state.isModalOpen} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <Form onSubmit={this.handleSubmit}>
                            <FormGroup>
                                <Label htmlFor="rating"><b>Rating</b></Label>
                                <Input type="select" id="rating" name="rating">
                                    <option>1</option>
                                    <option>2</option>
                                    <option>3</option>
                                    <option>4</option>
                                    innerRef={(input) => this.rating = input} 
                                </Input>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="name"><b>Your Name</b></Label>
                                <Input type="text" id="name" name="name"
                                    innerRef={(input) => this.name = input} 
                                    value = {this.state.name}
                                    valid = {errors.name === ''}
                                    invalid = {errors.name !== ''}
                                    onBlur={this.handleBlur('name')}
                                    onChange = {this.handleInputChange}/>
                                    <FormFeedback>{errors.name}</FormFeedback>
                            </FormGroup>
                            <FormGroup>
                                <Label htmlFor="comment"><b>Comment</b></Label>
                                <Input type="textarea" id="comment" name="comment"
                                    innerRef={(input) => this.comment = input}  />
                            </FormGroup>
                            <Button type="submit" value="submit" color="primary">Submit</Button>
                        </Form>
                    </ModalBody>
                </Modal>
            </div>
        );
    }
}

export default CommentForm;