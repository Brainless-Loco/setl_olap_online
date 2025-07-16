import React, { useEffect } from 'react';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';
import { clear_alert} from "@/lib/redux/action"

const Alert = () => {
  const dispatch = useDispatch();
  const { message, type, title } = useSelector(state => state.queryReducer.alertInfo);

  useEffect(() => {
    if (!message) return;

    Swal.fire({
      icon: type || 'info', // fallback to info
      title: title,
      text: message,
      confirmButtonText: 'OK',
    }).then(() => {
      dispatch(clear_alert());
    });
  }, [message, type, dispatch]);

  return null; // no visual component, SweetAlert2 handles modal UI
};

export default Alert;
