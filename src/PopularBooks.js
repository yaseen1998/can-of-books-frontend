import axios from "axios";
import React, { Component } from "react";
import { Carousel, Caption } from "react-bootstrap";
import style from "./style.css";
import Addform from "./components/Addform";
import {Button} from 'react-bootstrap'
class PopularBooks extends Component {
  
  constructor(props) {
     
    super(props);
    this.variable = [];
    this.state = {
      bookData: [],
      showform: false,
      showaddbutton:true,
      showupdate:false,
      bookid:'',
      buttonbook:"",
      title: '',
      description: '',
      status: '',
      email: '',
      formikclass:''
    };
  }
// start mount
  componentDidMount = () => {
    axios
      .get(`https://yaseen-booksbackend.herokuapp.com/books`)
      .then((Response) => {
        this.setState({
          bookData: Response.data,
        });
      });
  };
  
  //start submit
  handleSubmit = async (values) => {
    
    const booklist = {
      title: values.title,
      description: values.description,
      status: values.status,
      email: values.email,
    };
    let books
if(this.state.showupdate){
   
    books = await axios.put(
    `https://yaseen-booksbackend.herokuapp.com/update-book/${this.state.bookid}`, booklist);
    // window.location.reload();
}
    // let books = await axios.post(`http://localhost:8000/create-book`, booklist);
  else {  
    books = await axios.post(`https://yaseen-booksbackend.herokuapp.com/create-book`, booklist);
    }

    this.setState({
      bookData:books.data,
      showupdate:false,
    });
  };


//start delete
  handleDelete = async (id) => {
    let bookid = id;
    let deletebook = await axios.delete(
      `https://yaseen-booksbackend.herokuapp.com/delete-book/${bookid}`
    );
    this.setState({
      bookData: deletebook.data,
    });
  };


//start update
  handleupdate = async (id,namemovie,descriptionmovie,statusmovie,emailmovie) => {
    setTimeout(()=>{ this.setState({showform: true}); }, 500)
    this.setState({
      showupdate:true,
      showform: false,
      showaddbutton:true,
      buttonbook:'update book',
      bookid:id,
      title:namemovie,
      description:descriptionmovie,
      status:statusmovie,
      email:emailmovie,
      formikclass:'updatebook'
    });

  }
  
// start show
  showform = () => {
    setTimeout(()=>{ this.setState({showform: true}); }, 500)
    this.setState({
      showform: false,
      showaddbutton:false,
      buttonbook:'add book',
      title:'',
      description:'',
      status:'',
      email:'',
      formikclass:'addbook'
    });
  };
  closeform = () => {
    this.setState({
      showform: false,
      showaddbutton:true,
      
    });
  };
  render() {
    return (
      <div>
        {/* <h1> you must refresh the page for add item this issue just in heroku not in localhost</h1> */}
        <div className='mainForm'>
          {this.state.showaddbutton &&
          <Button type="button" onClick={this.showform} variant="success" className='addbutton'>
            {" "}
            add book
          </Button>
  }
         
          {this.state.showform && <Addform
          buttonbook={this.state.buttonbook} 
          title={this.state.title}
          description={this.state.description}
        status={this.state.status}
      email={this.state.email}
      handleSubmit={this.handleSubmit}
      formikclass={this.state.formikclass}
      />}

            {this.state.showform &&
          <Button type="button" onClick={this.closeform} className='closebutton' variant="dark">
             {" "}
             <br/>
            close
          </Button>}
        </div>




        {this.state.bookData.length > 0  &&(
          <Carousel indicators={false} className="Carousel">
            {this.state.bookData.map((Element, i) => {
              return (
                <Carousel.Item key={i}>
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
                    <Button onClick={() => this.handleDelete(Element._id)} variant="danger">
                      {" "}
                      remove item
                    </Button>{' '}
                    <Button  variant="info" onClick={() => this.handleupdate(Element._id,Element.title,Element.description,Element.status,Element.email)}>
                      {" "}
                      update item
                    </Button>
                    {/* {this.setState({key:Element._id})} */}
                  </Carousel.Caption>
                </Carousel.Item>
              );
            })}
          </Carousel>
        )}





        {this.state.bookData.length === 0 && (
          <h3 className='empty'>The book collection is empty.</h3>
        )}
      </div>
    );
  }
}

export default PopularBooks;
