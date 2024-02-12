import AdForm from "../AdForm/AdForm";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import { getAdById } from "../../../redux/adsRedux";
import { editAdRequest } from "../../../redux/adsRedux";
import { getRequests } from "../../../redux/adsRedux";
import { Alert } from "react-bootstrap";

const EditAdForm = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { id } = useParams();
    const adData = useSelector((state) => getAdById(state, id));
    const request = useSelector(getRequests);

    const handleSubmit = ad => {
      const adForm = {id: adData._id, ad}
      dispatch(editAdRequest(adForm));
      setTimeout(() => {
        navigate('/')
      },2000);
    };

    return (
      (request['app/ads/EDIT_AD'] && request['app/ads/EDIT_AD'].success) ? (
        <Alert variant="success">
          <Alert.Heading>Advertise has been updated</Alert.Heading>
        </Alert>
      ):(
      <AdForm
        action={handleSubmit}
        actionText='Edit advertisment'
        author={adData.author._id}
        {...adData}
      />
      )
    );
};

export default EditAdForm;