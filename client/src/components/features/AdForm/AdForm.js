import { Form } from "react-bootstrap";
import  { Row } from "react-bootstrap";
import  { Col } from "react-bootstrap";
import  { Button } from "react-bootstrap";
import { useState } from "react";
import { Card } from "react-bootstrap";
import { useForm } from 'react-hook-form';
//import ReactQuill from "react-quill";
//import 'react-quill/dist/quill.snow.css';


const AdForm = ({ action, actionText, author, date, img, ...props }) => {

  const [title, setTitle] = useState(props.title || '');
  const [price, setPrice] = useState(props.price || '');
  const [description, setDescription] = useState(props.description || '');
  const [location, setLocation] = useState(props.location || '');
  const [photo, setPhoto] = useState(null);
  const [descriptionError, setDescriptionError ] = useState(false);

  const { register, handleSubmit: validate, formState: { errors } } = useForm();

  
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPhoto(file);
    }
  };

  const handleSubmit = () => {
    console.log('edit data');
    setDescriptionError(!description);
    
    if (title && price && location && description) {
      const adData = {
        title,
        price,
        description,
        location,
        date,
        author: author._id
      };
      if(photo) {
        adData.photo = photo;
      }
      action(adData);
    }    
  } 

  return (
    <section>
      <Row className="d-flex flex-column"> 
        <Form onSubmit={validate(handleSubmit)}>
        
            <Col lg={6} xs={12} md={8}>

              <Form.Group className="mb-3 py-2 px-1" controlId="formGroupTitle">
                <Form.Label>Title</Form.Label>
                  <Form.Control
                    {...register("title", { required: true, minLength: 10 })}
                      value={title}
                      onChange={e => setTitle(e.target.value)}
                      type="text" placeholder="Enter title"
                    />
                      {errors.title && <small className="d-block form-text text-danger mt-2">This field is required (min 10 characters).</small>}
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
                <Form.Label>Photo:</Form.Label>
                  <Form.Control
                    accept=".jpeg, .png, .gif"
                    onChange={handleFileChange}
                    type="file"
                    />   
                </Form.Group>

                <Form.Group className="mb-4" controlId="floatingTextarea1">
                  <Form.Label>Short description</Form.Label>
                    <textarea 
                      className="form-control" 
                      style={{ height: '200px' }} 
                      value={description} 
                      onChange={e=>setDescription(e.target.value)}
                    />
                    { descriptionError &&  description.lengs < 20 (
                      <small className="d-block form-text text-danger mt-2">Description can't be empty(min 20 characters)</small>
                    )}
                </Form.Group>

                <Card.Text className="mx-3 p-5 d-flex justify-content-between align-items-center">
                  <div className="d-flex align-items-center">
                    <i> <b>Created by: </b>{author.login}</i>
                  </div>
                  <div>
                    <i><b>Published Date: </b>  {date}</i>
                  </div>
              </Card.Text>

           </Col>

           <Button variant="secondary" type="submit" className="px-5">{actionText}</Button>

        </Form>
    </Row>
  </section>
  )
}

export default AdForm;

