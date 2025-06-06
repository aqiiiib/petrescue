
import React, {useEffect, useState } from 'react';
import axios from 'axios';
import { redirect, useNavigate } from 'react-router-dom';
import { Form, Button, Container, Row, Col, Alert } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';



const CreatePostForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    district: '',
    summary: '',
    content: '',
    contact: '',
    petImage: null,
    user_id:''
  });
  useEffect(() => {
  const params = new URLSearchParams(window.location.search);
  const userId = params.get('user_id');
  if (userId) {
    setFormData(prev => ({ ...prev, user_id: userId }));
  }
}, []);
  const [message, setMessage] = useState('');
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: files ? files[0] : value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => data.append(key, value));

    try {
       await axios.post('http://localhost:3001/api/posts', data);
             setMessage('Post created successfully');
       window.location.href = 'http://localhost/woof/users/index.php';

    } catch (error) {
      console.error('Error uploading post:', error);
    }
  };

 return (
    <Container className="my-5 p-4 bg-white rounded shadow-lg">
      <div className="d-flex justify-content-between align-items-center mb-4 border-bottom pb-3">
        <h1 className="h3">Create New Post</h1>
        <Button variant="outline-secondary" onClick={() => window.history.back()}>&times;</Button>
      </div>

      {message && <Alert variant="success">{message}</Alert>}

      <Form onSubmit={handleSubmit}>
        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Basic Information</h5>
          <Row>
            <Col md={6}>
              <Form.Group controlId="title">
                <Form.Label>Post Type</Form.Label>
                <Form.Select name="title" required onChange={handleChange} value={formData.title}>
                  <option value="">Select Post Type</option>
                  <option value="Adopt">Adopt</option>
                  <option value="Rehome">Rehome</option>
                </Form.Select>
              </Form.Group>
            </Col>
            <Col md={6}>
              <Form.Group controlId="district">
                <Form.Label>District</Form.Label>
                <Form.Select name="district" required onChange={handleChange} value={formData.district}>
                  <option value="">Select District</option>
                  {["Ampara", "Anuradhapura", "Badulla", "Batticaloa", "Colombo", "Galle", "Gampaha", "Hambantota", "Jaffna", "Kalutara", "Kandy", "Kegalle", "Kilinochchi", "Mannar", "Matale", "Matara", "Monaragala", "Mullaitivu", "Nuwara Eliya", "Puttalam", "Ratnapura", "Trincomalee", "Vavuniya"].map(d => <option key={d} value={d}>{d}</option>)}
                </Form.Select>
              </Form.Group>
            </Col>
          </Row>
        </div>

        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Pet Image</h5>
          <Form.Group controlId="image">
            <Form.Label>Choose an image</Form.Label>
            <Form.Control type="file" name="petImage" accept="image/*" onChange={handleChange} required />
          </Form.Group>
        </div>

        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Post Details</h5>
          <Form.Group controlId="summary" className="mb-3">
            <Form.Label>Short Summary</Form.Label>
            <Form.Control as="textarea" rows={3} name="summary" placeholder="Enter a summary" required onChange={handleChange} value={formData.summary} />
          </Form.Group>
          <Form.Group controlId="content">
            <Form.Label>Full Description</Form.Label>
            <Form.Control as="textarea" rows={6} name="content" placeholder="Enter post details" required onChange={handleChange} value={formData.content} />
          </Form.Group>
        </div>

        <div className="mb-4">
          <h5 className="mb-3 border-bottom pb-2">Contact Information</h5>
          <Form.Group controlId="contact">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control type="tel" name="contact"  placeholder="Enter contact number" required onChange={handleChange} value={formData.contact} />
          </Form.Group>
        </div>

        <div className="d-flex justify-content-end gap-3">
          <Button type="submit" variant="success">Create Post</Button>
          <Button variant="outline-warning" onClick={() => window.history.back()}>Cancel</Button>
        </div>
      </Form>
    </Container>
  );
};
export default CreatePostForm;
