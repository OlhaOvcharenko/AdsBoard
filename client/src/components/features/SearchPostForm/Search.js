import { InputGroup, Button, Form } from "react-bootstrap";

const Search = () => {
  return (
    <section className="Search">
      <Form>
        <div className="d-flex justify-content-center">
          <InputGroup className="mb-3" style={{ width: "500px" }}>
            <Form.Control placeholder="Search ads by title, location.." aria-describedby="basic-addon2"/>
            <Button variant="outline-secondary" id="button-addon2">
              Search
            </Button>
          </InputGroup>
        </div>
      </Form>
    </section> 
   );
}

export default Search;