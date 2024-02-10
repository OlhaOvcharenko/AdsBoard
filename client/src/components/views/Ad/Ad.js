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
  const userAvatar = user.currentUser.user.avatar;
  const authorImg = adData.author.avatar;
  console.log(authorImg)
  console.log(userAvatar);

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
              <h2 className="text-center">{adData.title}</h2>
            </Col>
          </Row>
          <Card className="border-0">
            <Card.Body>
              <Card.Img variant="top m-2" src={`${IMAGES_URL}/${adData.photo}`} style={{ height: '20rem', objectFit: 'cover' }} />
              <Card.Text className="m-3" dangerouslySetInnerHTML={{ __html: adData.description }}></Card.Text>
              <Card.Text className="m-3"><b>Location:</b> {adData.location}</Card.Text>
              <Card.Text className="m-3">
                <b>Price:</b> {adData.price}zl
              </Card.Text>

              <Card.Text className="mx-3 pt-3 d-flex align-items-center">
                <img src={`${IMAGES_URL}/${authorImg}`} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                <i>{adData.author.login}</i>
             </Card.Text>

              <Card.Text className="mx-3 my-0">
                <i>{adData.date}</i>
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