import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import { deleteAdsRequest, getAdById } from "../../../redux/adsRedux";
import { getUser } from "../../../redux/userRedux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";


const Ad = (props) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const adData = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);

  const handleDelete = () => {
    dispatch(deleteAdsRequest(id))
    navigate('/'); 
  };

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
              <Card.Text>
                <b>Price:</b> {adData.price}zl
              </Card.Text>
              <Card.Text>
                <i>Created by: {adData.author.login}</i>
              </Card.Text>
      
              {authorOfAd && (
                <Button as={Link} key={props.id} to={`/ads/edit/${adData._id}`} className="m-2" variant="secondary"> Edit advert </Button>
              )}

              {/* Delete button */}
              {authorOfAd && (
                <Button onClick={handleDelete} className="m-2" variant="danger"> Delete advert </Button>
              )}

             
            </Card.Body>
          </Card>
        </Col>
      </Row>
    );
  }
};

export default Ad;