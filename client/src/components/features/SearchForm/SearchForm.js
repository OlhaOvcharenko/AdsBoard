import React, { useState } from 'react';
import { Form, InputGroup, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateSearchPhrase } from '../../../redux/adsRedux';

const Search = () => {
 
  const [searchPhrase, setSearchPhrase] = useState('');
  
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    
    if (searchPhrase.trim() === '') {
     
      alert('Please enter a search term');
    } else {
      dispatch(updateSearchPhrase(searchPhrase));
      setSearchPhrase("");
      navigate(`/ads/search/${searchPhrase}`);
    }
  };

  return (
    <section className="Search">
      <Form onSubmit={handleSearch}>
        <div className="d-flex justify-content-center">
          <InputGroup className="mb-3" style={{ width: "500px" }}>
            <Form.Control
              type="text"
              placeholder="Search ads by phrase.."
              aria-describedby="basic-addon2"
              value={searchPhrase}
              onChange={(e) => setSearchPhrase(e.target.value)}
            />
            <Button variant="outline-secondary" id="button-addon2" type="submit">
              Search
            </Button>
          </InputGroup>
        </div>
      </Form>
    </section>
  );
};

export default Search;