import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from "yup";

export default function AddPosts() {

    const PostInitialValues = {
        body: "",
        heading: ""
    }
    const PostSchema = Yup.object().shape({
        body: Yup.string().min(5).max(250).required(),
        heading: Yup.string().min(1).max(50).required(),
    })

    const onSubmit = async (values) => {
        fetch('http://localhost:3000/posts', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify(values)
        })
            .then(res => res.json())
            .then(data => console.log("succes", data))
            .catch(err => console.log("error", err))
    }

    return (
        <Formik
            initialValues={PostInitialValues}
            validationSchema={PostSchema}
            onSubmit={onSubmit}
        >
            <Form className='py-5 flex flex-col gap-5'>
                <div className='group'>
                    <label htmlFor="title">Heading</label>
                    <Field name="heading" id="title" placholder="please Enter title" />
                    <ErrorMessage name='heading' component="div" />
                </div>

                <div className='group'>
                    <label htmlFor="body">Body</label>
                    <Field as='textarea' name="body" id="body" placholder="please Enter body" />
                    <ErrorMessage name='body' component="div" />
                </div>
                <button className='btn' type='submit'>Submit</button>
            </Form>
        </Formik>
    )
}
