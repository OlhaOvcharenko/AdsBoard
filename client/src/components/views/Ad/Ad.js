import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Nav } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { getAdById } from "../../../redux/adsRedux";
import { getUser } from "../../../redux/userRedux";
import { Link } from "react-router-dom";

const Ad = (props) => {

  const { id } = useParams();
  console.log(id, 'id');
  const adData = useSelector(state => getAdById(state, id));
  console.log(adData);

  const user = useSelector(getUser);
  const authorOfAd = user.currentUser && user.currentUser.user._id === adData.author._id;

  if (!adData) return <Navigate to="/" />;
  else {
    
    return (
      <Row className="justify-content-center">
        <Col className="col-lg-6">
          <Row>
            <Col>
              <h1 className={'px-3'}>{adData.title}</h1>
            </Col>
          </Row>
          <Card className="border-0">
            <Card.Body>
              <Card.Img variant="top mb-2" src={`${IMAGES_URL}/${adData.photo}`} style={{ height: '20rem', objectFit: 'cover' }} />
              <Card.Text dangerouslySetInnerHTML={{ __html: adData.description }}></Card.Text>
              <Card.Text className="mb-3"><b>Location:</b> {adData.location}</Card.Text>
              
              
              {authorOfAd && (
                <Button as={Link} key={props.id} to={`/ads/edit/${adData._id}`} className="m-2" variant="secondary"> Edit advert </Button>
              )}

              {/* Delete button */}
              {authorOfAd && (
                <Button className="m-2" variant="danger"> Delete advert </Button>
              )}
              
              
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
};

export default Ad;