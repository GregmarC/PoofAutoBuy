import React, { Component } from 'react';
import { Card, CardImg, CardImgOverlay, CardText, CardBody,
    CardTitle } from 'reactstrap';

class DishDetail extends Component {

    constructor(props) {
        super(props);

        this.state = {
        }
    }

    renderDish(dish) {
        if (dish != null)
            return(
                <div className="col-12 col-md-5 m-1">
                    <Card>
                        <CardImg top src={dish.image} alt={dish.name} />
                        <CardBody>
                        <CardTitle>{dish.name}</CardTitle>
                        <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );
        else
            return(
                <div></div>
            );
    }

    renderComments(comments) {
        if (comments != null) {
            const comm = comments.map((cmt) => {
                return (
                    <div  key={cmt.id}>
                        &nbsp;
                        <li>{cmt.comment}</li>
                        &nbsp;
                        <li>-- {cmt.author} , {new Intl.DateTimeFormat('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: '2-digit'
                        }).format(new Date(cmt.date))}</li>
                    </div>
                );
            });
            return (
                <div className="col-12 col-md-5 m-1">
                    <h4> Comments </h4>
                    <ul className="list-unstyled">
                        {comm}
                    </ul>
                </div>
            );  
        }
        else{
            return(
                <div></div>
            );
        }

        
    }


    render() {
        const dishSelected = this.props.dish
        if (dishSelected != null){
            
            const dishDescription = this.renderDish(dishSelected)
            const dishComments = this.renderComments(dishSelected.comments)
    
            return (
                <div class="container">
                    <div className="row">
                        {dishDescription}
                        {dishComments}
                    </div>
                </div>
            );
        }
        else{
            return (
                <div></div>
            );
        }
        

    }
}

export default DishDetail;