import React, { Component } from 'react'
// import PopularBooks from '../PopularBooks';
import { Formik, Field, ErrorMessage} from "formik"
import * as Yup from "yup"
import style from "../style.css";
import {Button} from 'react-bootstrap'
 class Addform extends Component {
    constructor(props) {
        super(props);
        this.state = {
            titleform:'',
            descriotionform:'',
            senddata:false
        }
    }
onsubmit=(values)=>{
    console.log(values.title);
    this.setState({
        titleform:values.title,
        descriotionform:values.description,
        senddata:true

    })
   


    
       

    
}
form=(props)=>{
    return  <form onSubmit={props.handleSubmit} className={this.props.formikclass}>
         <label htmlFor=""> title</label>
        <Field name = "title"/>
        <br/>
        <ErrorMessage name="title" /> 
        <br/>
        <hr/>
        <label htmlFor=""> description</label>
        {/* <Field as="textarea"  name="descriptio"></Field> */}
        <Field name = "description" as="textarea"/>
        <br/>
        <ErrorMessage name="description" /> 
        <br/>
        <hr/>
        <label htmlFor=""> status</label>
        <Field name = "status"/>
        <br/>
        <ErrorMessage name="status" /> 
        <br/>
        <hr/>
        <label htmlFor=""> email</label>
        <Field name="email" type="email" />
        <br/>
        <ErrorMessage name="email" /> 
        <br/>
        <hr/>
        <Button type="submit"  variant="dark" >{this.props.buttonbook}  </Button>
    </form>
    
}
schema = () => {
    const schema = Yup.object().shape({
      title: Yup.string().required(),
      description: Yup.string().required(),
      email: Yup.string().required(),
      status: Yup.string().required(),
    })
    return schema;
}

    render() {
        return (
            <>
                 <Formik 
          initialValues={{
              title : this.props.title,
              description:this.props.description,
              status:this.props.status,
              email:this.props.email
          }}
          onSubmit={this.props.handleSubmit }
          render={this.form}
          validationSchema={this.schema()}
          /> 
            </>
        )
    }
}

export default Addform