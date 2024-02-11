import { Card } from "react-bootstrap";
import { Button } from "react-bootstrap";
import { Row } from "react-bootstrap";
import { Col } from "react-bootstrap";
import { IMAGES_URL } from "../../../config";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { deleteAdsRequest, getAdById } from "../../../redux/adsRedux";
import { getUser } from "../../../redux/userRedux";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import styles from './SingleAd.module.scss'
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapLocation, faMoneyBill } from "@fortawesome/free-solid-svg-icons";

const SingleAd = (props) => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const adData = useSelector(state => getAdById(state, id));
  const user = useSelector(getUser);

  const authorImg = adData.author.avatar;
  console.log(authorImg)


  const handleDelete = () => {
    dispatch(deleteAdsRequest(id))
    navigate('/'); 
  };

  const authorOfAd = user?.currentUser?.user._id === adData.author._id;

  if (!adData) navigate('/')
  else 
  return (
    <Row className="justify-content-center">
      <Col className="col-lg-6">
        <Row>
          <Col>
            <h2 className={styles.title}>{adData.title}</h2>
          </Col>
        </Row>
        <Card className="border-0">
          <Card.Body>
            <Card.Text className="m-3 d-flex align-items-center">
              <FontAwesomeIcon icon={faMapLocation} className="mr-2 px-2" />
              {adData.location}
            </Card.Text>

            <Card.Img variant="top m-2" src={`${IMAGES_URL}/${adData.photo}`} style={{ height: '20rem', objectFit: 'cover' }} />
            <Card.Text className="m-3" dangerouslySetInnerHTML={{ __html: adData.description }}></Card.Text>
            
            <Card.Text className="m-3">
              <FontAwesomeIcon icon={faMoneyBill} className="mr-2 px-2" /> {adData.price} PLN
            </Card.Text>

            <Card.Text className="mx-3 py-3 d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <img src={`${IMAGES_URL}/${authorImg}`} alt="Avatar" style={{ width: '30px', height: '30px', borderRadius: '50%', marginRight: '10px' }} />
                <i>{adData.author.login}</i>
              </div>
              <p className="mt-2"><i>Published Date: {adData.date}</i></p> {/* Updated */}
            </Card.Text>
                        
            {authorOfAd && (
              <Button as={Link} key={props.id} to={`/ads/edit/${adData._id}`} className="mt-2 mx-4" variant="secondary"> Edit advert </Button>
            )}

            {/* Delete button */}
            {authorOfAd && (
              <Button onClick={handleDelete} className="mt-2" variant="danger"> Delete advert </Button>
            )}
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default SingleAd;