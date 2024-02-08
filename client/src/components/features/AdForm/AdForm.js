import { Form } from "react-bootstrap";
import  { Row } from "react-bootstrap";
import  { Col } from "react-bootstrap";
import  { Button } from "react-bootstrap";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useForm } from 'react-hook-form';
import { Alert } from "react-bootstrap";
import { Spinner }from "react-bootstrap";

import { useSelector } from "react-redux";
import { getRequest } from "../../../redux/adsRedux";
import { CREATE_AD } from "../../../redux/adsRedux";


import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';


const AdForm = ({ action, actionText, author, date, ...props }) => {
    
    const request = useSelector(state => getRequest(state, CREATE_AD));

    console.log(request);

    const [title, setTitle] = useState(props.title || '');
    const [price, setPrice] = useState(props.price || '');
    const [description, setDescription] = useState(props.description || '');
    const [location, setLocation] = useState(props.location || '');
    const [photo, setPhoto] = useState(props.location || '');
    const [descriptionError, setDescriptionError ] = useState(false);
    const [photoError, setPhotoError ] = useState(false);

    console.log(title, price, description, location, photo, date, author.id);

    const { register, handleSubmit: validate, formState: { errors } } = useForm();

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setPhoto(file);
    };

    const handleSubmit = () => {
       
        setDescriptionError(!description);
        setPhotoError(!photo);

        if (title && price && location && description && photo ) {
            const formData = new FormData();
            
            formData.append('title', title);
            formData.append('price', price);
            formData.append('location', location);
            formData.append('description', description);
            formData.append('author', author.id);
            formData.append('date', date);
            formData.append('photo', photo);

            action(formData);
          
        }
       

    };
     
    return (

        <section>

            <Row className="d-flex flex-column"> 
                <Form onSubmit={validate(handleSubmit)}>
                  <h2>Add your advertise: </h2>
                    <Col lg={6} xs={12} md={8}>
                        <Form.Group className="mb-3 py-2 px-1" controlId="formGroupTitle">
                          <Form.Label>Title</Form.Label>
                            <Form.Control
                                {...register("title", { required: true, minLength: 5 })}
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                type="text" placeholder="Enter title"
                            />
                            {errors.title && <small className="d-block form-text text-danger mt-2">This field is required (min 5 characters).</small>}
                        </Form.Group>
                        <Form.Group className="mb-3 px-1" controlId="formGroupLocation">
                            <Form.Label>Location</Form.Label>
                            <Form.Control
                                {...register("location", { required: true, minLength: 5 })}
                                value={location}
                                onChange={e => setLocation(e.target.value)}
                                type="text" placeholder="Enter location"
                            />
                            {errors.location && <small className="d-block form-text text-danger mt-2">This field is required (min 5 characters).</small>}
                        </Form.Group>
                        <Form.Group className="mb-3 px-1" controlId="formGroupPrice">
                            <Form.Label>Price</Form.Label>
                            <Form.Control
                                {...register("price", { required: true, pattern: /^[0-9]+(\.[0-9]{1,2})?$/ })}
                                value={price}
                                onChange={e => setPrice(e.target.value)}
                                type="text" placeholder="Enter price"
                            />
                            {errors.price && <small className="d-block form-text text-danger mt-2">Invalid price format.</small>}
                        </Form.Group>
                    </Col>

                    <Col lg={8} xs={12} md={10} className="px-1">

                       <Form.Group className="mb-3" controlId="formFile">
                            <Form.Label>Photo</Form.Label>
                            <Form.Control
                                accept=".jpeg, .png, .gif"
                                onChange={handleFileChange}
                                type="file"
                            />
                            {photoError && (<small className="d-block form-text text-danger mt-2">Image is required</small>)}
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="floatingTextarea1">
                            <Form.Label>Short description</Form.Label>
                            <ReactQuill theme="snow" style={{ height: '200px' }} value={description} onChange={setDescription} />
                            { descriptionError && (<small className="d-block form-text text-danger mt-5">Description can't be empty</small>)}
                        </Form.Group>

                        <Card.Text className="px-2 mt-5">
                          Created by: {author.login}
                        </Card.Text>
                        <Card.Text className="px-2 py-1">
                          Date: {date}
                        </Card.Text>
                    </Col>

                    <Button type="submit" className="mx-1 mt-5">{actionText}</Button>

                </Form>
            </Row>
        </section>
    )

}

export default AdForm;

