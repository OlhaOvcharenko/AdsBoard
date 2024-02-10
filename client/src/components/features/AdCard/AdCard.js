import { Col, Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { Link } from "react-router-dom";

const AdCard = ({ad}) => {
 
  return(
  <Col className="col-lg-4 col-sm-12 col-md-4 mx-3 py-2" style={{ width:'25rem'}}>
    <Card>
        <Card.Body className="p-0">
        <Card.Img variant="top mb-2" src={`${IMAGES_URL}/${ad.photo}`} style={{height: '20rem', objectFit: 'cover' }} />
        <Card.Title className="px-2">{ad.title}</Card.Title>
        <Card.Text className="px-2 py-1">
          <b>Location:</b> {ad.location}
        </Card.Text>
        <Button  as={Link} to={`/ads/${ad._id}`} className="m-2" variant="secondary">Read More</Button>
      </Card.Body>
    </Card>
  </Col>)
};
  
export default AdCard;

