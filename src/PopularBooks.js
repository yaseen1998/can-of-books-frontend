import axios from 'axios';
import React, { Component } from 'react';
import {
    Carousel,
    Caption
} from 'react-bootstrap';
import style from './style.css'
class PopularBooks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
        }
    }
    componentDidMount = () => {
        axios.get(`http://localhost:8000/books2?id=61478ed4dfa35d6268a24570`).then(Response => {
            this.setState({
                bookData: Response.data.Books,
            })
        })

    }
    render() {
        return (
            <div>
                {this.state.bookData.length > 0 && <Carousel indicators={false} className="Carousel" >
                    {
                        this.state.bookData.map((Element, i) => {
                            return <Carousel.Item>
                                <img
                                    className="d-block w-100"
                                    src="https://colorcasters.com/wp-content/uploads/2014/05/Black-300x300.jpeg"
                                    alt="First slide"
                                />
                                <Carousel.Caption className="color">
                                    <h3 className="ele">Book Title :{Element.title}</h3>
                                    <p className="ele">Description :{Element.description}</p>
                                    <p className="ele">Status :{Element.status}</p>
                                    <p className="ele">E-mail :{Element.email}</p>
                                </Carousel.Caption>
                            </Carousel.Item>
                        })}

                </Carousel>
                }
                {
                    this.state.bookData.length ===0 && <h3>The book collection is empty.</h3>
                }
            </div>
        )
    }
}

export default PopularBooks
