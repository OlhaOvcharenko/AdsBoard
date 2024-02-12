import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { Alert } from "react-bootstrap";
import { createAdRequest} from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { getUser } from '../../../redux/userRedux';
import { loadAdsRequest } from "../../../redux/adsRedux";
import { getRequests } from "../../../redux/adsRedux";
import AdForm from "../AdForm/AdForm";

const CreateAdForm = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
   
  const user = useSelector(getUser);
  
  const request = useSelector(getRequests);

  const author = {
    _id: user?.currentUser?.user?._id,
    login: user?.currentUser?.user?.login,
  };
  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = ad => {
    dispatch(createAdRequest(ad)).then(() => {
      dispatch(loadAdsRequest()).then(() => {
  
        setTimeout(() => {
          navigate('/')
        },2000);
      });
    });
  };

  return (
  
    (request['app/ads/CREATE_AD'] && request['app/ads/CREATE_AD'].success) ? (
      <Alert variant="success">
        <Alert.Heading>Advertise has been created</Alert.Heading>
      </Alert>
    ):(
    <AdForm
      action={handleSubmit}
      actionText="Publish"
      author={author}
      date={currentDate}
    />
    )

  );
};

export default CreateAdForm;