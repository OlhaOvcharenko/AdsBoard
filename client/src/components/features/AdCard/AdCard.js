import { Link } from 'react-router-dom';
import { Col, Card } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'; // Import the narrow icon from Font Awesome
import { IMAGES_URL } from '../../../config';
import styles from '../AdCard/AdCard.module.scss'

const AdCard = ({ ad }) => {
  return (
    
    <Col className="col-lg-4 col-sm-12 col-md-8 mx-3 py-2" style={{ maxWidth: '18rem' }}>
      <Card className="shadow" style={{ borderRadius: '10px' }}>
        <Card.Body className="p-0">
          <Card.Img variant="top mb-2" src={`${IMAGES_URL}/${ad.photo}`} style={{ height: '20rem', objectFit: 'cover', borderRadius: '10px' }} />
          <h5 className="px-2">{ad.title}</h5>
          <Card.Text className="px-2 py-1">
            {ad.location}
          </Card.Text>
          <div className={styles['card-container']}>
            <div className={styles['icon-wrapper']}>
              <Link to={`/ads/${ad._id}`} className={styles['circle-link']}>
                <FontAwesomeIcon icon={faArrowRight} className={styles.icon} />
              </Link>
            </div>
          </div>
        </Card.Body>
      </Card>
    </Col>
  
  );
};

export default AdCard;

