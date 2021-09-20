import React, { Component } from 'react'
import PopularBooks from '../PopularBooks';
import { Formik, Field, ErrorMessage ,FieldArray} from "formik"
import * as Yup from "yup"
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
    return  <form onSubmit={props.handleSubmit}>
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
        <button type="submit" >add new</button>
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
              title : '',
              description:'',
              status:'',
              email:''
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