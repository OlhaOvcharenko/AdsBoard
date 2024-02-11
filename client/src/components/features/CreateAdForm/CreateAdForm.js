import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { createAdRequest} from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { getUser } from '../../../redux/userRedux';
import { loadAdsRequest } from "../../../redux/adsRedux";

import AdForm from "../AdForm/AdForm";

const CreateAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);
  const author = {
    _id: user?.currentUser?.user?._id,
    login: user?.currentUser?.user?.login,
  };
  const currentDate = new Date().toISOString().split('T')[0];

  const handleSubmit = ad => {
    dispatch(createAdRequest(ad)).then(() => {
      alert('Advertisement created successfully');
      dispatch(loadAdsRequest()).then(() => {
        navigate('/');
      });
    });
  };

  return (
    <AdForm
      action={handleSubmit}
      actionText="Publish"
      author={author}
      date={currentDate}
    />
  );
};

export default CreateAdForm;