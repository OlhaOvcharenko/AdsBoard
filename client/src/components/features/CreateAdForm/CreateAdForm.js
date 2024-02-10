import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";

import { createAdRequest } from "../../../redux/adsRedux";
import { useSelector } from "react-redux";
import { getUser } from '../../../redux/userRedux';
import { useState } from "react";
import { useEffect } from "react";

import AdForm from "../AdForm/AdForm";

const CreateAdForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(getUser);

  const [author, setAuthor] = useState('');
  const [date, setDate] = useState('');
 

  useEffect(() => {
      if (user) {
        setAuthor({
          _id: user.currentUser.user._id, 
          login: user.currentUser.user.login,
        });
        const currentDate = new Date();
        const formattedDate = currentDate.toISOString().split('T')[0]; // Get current date in YYYY-MM-DD format
        setDate(formattedDate);
      }
  }, [user]);

  const handleSubmit = ad => {
    dispatch(createAdRequest(ad)).then(() => {
      console.log(ad, createAdRequest, 'ad')
      navigate('/'); 
      console.log(' ad request dispatched');
    });
  };

  return (
      <AdForm
          action={handleSubmit}
          actionText="Create advertisement"
          author={author}
          date={date}
      />
  );
};

export default CreateAdForm;