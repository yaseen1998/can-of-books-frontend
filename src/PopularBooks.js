import axios from "axios";
import React, { Component } from "react";
import { Carousel, Caption } from "react-bootstrap";
import style from "./style.css";
import Addform from "./components/Addform";
class PopularBooks extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bookData: [],
      showform: false,
      showaddbutton:true
    };
  }

  componentDidMount = () => {
    axios
      .get(`https://yaseen-booksbackend.herokuapp.com/books`)
      .then((Response) => {
        this.setState({
          bookData: Response.data,
        });
      });
  };

  handleSubmit = async (values) => {
    const booklist = {
      title: values.title,
      description: values.description,
      status: values.status,
      email: values.email,
    };
    // let books = await axios.post(`http://localhost:8000/create-book`, booklist);
    let books = await axios.post(`https://yaseen-booksbackend.herokuapp.com/create-book`, booklist);
    this.setState({
      bookData: books.data,
    });
  };
  handleDelete = async (id) => {
    let bookid = id;
    let deletebook = await axios.delete(
      `https://yaseen-booksbackend.herokuapp.com/delete-book/${bookid}`
    );
    this.setState({
      bookData: deletebook.data,
    });
  };
  showform = () => {
    this.setState({
      showform: true,
      showaddbutton:false
    });
  };
  closeform = () => {
    this.setState({
      showform: false,
      showaddbutton:true
    });
  };
  render() {
    return (
      <div>
        <div className='mainForm'>
          {this.state.showaddbutton &&
          <button type="button" onClick={this.showform}>
            {" "}
            add book
          </button>
  }
          <br/>
            <hr/>
          {this.state.showform && <Addform handleSubmit={this.handleSubmit} />}
          <br/>
            <hr/>
            {this.state.showform &&
          <button type="button" onClick={this.closeform}>
             {" "}
             <br/>
            close
          </button>}
        </div>

        {this.state.bookData.length > 0 && (
          <Carousel indicators={false} className="Carousel">
            {this.state.bookData.map((Element, i) => {
              return (
                <Carousel.Item>
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
                    <button onClick={() => this.handleDelete(Element._id)}>
                      {" "}
                      remove item
                    </button>
                    {/* {this.setState({key:Element._id})} */}
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}
        {this.state.bookData.length === 0 && (
          <h3>The book collection is empty.</h3>
        )}
      </div>
    );
  }
}

export default PopularBooks;
