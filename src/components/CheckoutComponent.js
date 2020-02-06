import React, { Component } from 'react';
import { Breadcrumb, BreadcrumbItem, Card, CardBody, CardHeader, Media } from 'reactstrap';
import { Link } from 'react-router-dom';
import { baseUrl } from '../shared/baseUrl';
import { FadeTransform, Fade, Stagger } from 'react-animation-components';
import { Loading } from './LoadingComponent';
import {Elements, StripeProvider} from 'react-stripe-elements';
import CheckoutForm from './CheckoutFormComponent';
import {CardSection} from '../shared/CardSection.js';
import StripeCheckout from 'react-stripe-checkout';
import {Navbar, NavbarBrand, Nav, NavbarToggler, Collapse, NavItem, Jumbotron, Button, Modal, ModalHeader, ModalBody,
    Form, FormGroup, Input, Label } from 'reactstrap';
import firebase from 'firebase';
import {auth} from '../firebase.js';


class Checkout extends Component {
    constructor(props){
        super(props);
        this.state = {
            bronzePlan : false,
            silverPlan : false,
            goldPlan : false
        };

        this.onToken = this.onToken.bind(this);
        this.toggleBronze = this.toggleBronze.bind(this);
        this.toggleSilver = this.toggleSilver.bind(this);
        this.toggleGold = this.toggleGold.bind(this);
        this.signedInUser = this.signedInUser.bind(this);
    }

    toggleBronze(){
        this.setState({
            bronzePlan: true,
            silverPlan: false,
            goldPlan: false
        });
    }
    
    toggleSilver(){
        this.setState({
            silverPlan: true,
            bronzePlan: false,
            goldPlan: false
        });
    }

    toggleGold(){
        this.setState({
            goldPlan: true,
            bronzePlan: false,
            silverPlan: false
        });
    }

    signedInUser(){
        let user = auth.currentUser;
        if(user != null){
            console.log("User is signed in with: ", user);   
        }
        else{
            console.log("User is not signed in")
        }
    }

    async onToken(token) {
        console.log('onToken', token);
        this.signedInUser();

        const plan = () => {
            if (this.state.bronzePlan){
                return "bronze";
            }
            else if (this.state.silverPlan){
                return "silver";
            }
            else if (this.state.goldPlan){
                return "gold";
            }
        };

        const url = "https://us-central1-auto-purchaser.cloudfunctions.net/planSubscribe";

        let response = await fetch(url, {
            method: "POST", 
            headers: {"Content-Type": "text/plain"},
            body: JSON.stringify({uid: auth.currentUser.uid, token : token.id, subscription : plan()})
        });
        if (response.ok){
            var body = await response.json(); 
            console.log(body)
        }
    }

    render(){

    return(
        <div className="container">
            <div className="row">
                <Breadcrumb>
                    <BreadcrumbItem><Link to="/home">Home</Link></BreadcrumbItem>
                    <BreadcrumbItem active>Checkout</BreadcrumbItem>
                </Breadcrumb>
                <div className="col-12">
                    <h3>Checkout</h3>
                    <p>Please select a membership plan</p>
                    <hr />
                </div>                
            </div>
            <div className = "d-flex justify-content-center">
                <div className="row align-items-center">
                    <div className="m-4">
                        <Button color="danger" onClick={this.toggleBronze}>
                            <span className="fa fa-sign-in fa-lg"></span> Bronze</Button>
                    </div>
                    <div className="m-4">
                        <Button color="secondary" onClick={this.toggleSilver}>
                            <span className="fa fa-sign-in fa-lg"></span> Silver</Button>
                    </div>
                    <div className="m-4">
                        <Button color="warning" onClick={this.toggleGold}>
                            <span className="fa fa-sign-out-alt fa-lg"></span> Gold</Button>
                    </div>
                </div> 
            </div>     
                <StripeCheckout
                    token={this.onToken}
                    stripeKey="pk_test_riF4lNBnYKk2Caz9oJPJDEkg00vHb7arwy"/>
        </div>
    );
    }
}


export default Checkout;