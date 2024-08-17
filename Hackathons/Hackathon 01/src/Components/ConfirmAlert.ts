import swal from "sweetalert";

type alertType = {
  mainTitle?: string;
  mainText?: string;
  confirmBtnText?: string;
  deletedTitle?: string;
  deletedText?: string;
  cancelledTitle?: string;
  cancelledText?: string;
};

export const confirmAlert = (props: alertType): Promise<boolean> => {
  const { mainTitle, mainText, confirmBtnText } = props;

  return new Promise((resolve, reject) => {
    swal({
      title: mainTitle || "Are you sure?",
      text: mainText || "You won't be able to revert this!",
      icon: "warning",
      buttons: {
        cancel: {
          text: "No, cancel!",
          value: null,
          visible: true,
          className: "btn btn-danger btn-custom-danger",
          closeModal: true,
        },
        confirm: {
          text: confirmBtnText || "Yes, do it!",
          value: true,
          visible: true,
          className: "btn btn-success btn-custom-success",
          closeModal: true,
        },
      },
      dangerMode: true,
    }).then((willConfirm) => {
      if (willConfirm) {
        resolve(true);
      } else {
        reject(false);
      }
    }).catch((error) => {
      reject(error);
    });
  });
};

export const successAlert = (props: alertType): void => {
  const { deletedTitle, deletedText } = props;

  swal({
    title: deletedTitle || "Success!",
    text: deletedText || "Operation was successful.",
    icon: "success",
    buttons: {
      confirm: {
        text: "OK",
        className: "btn btn-success btn-custom-success",
      },
    },
  });
};

export const cancelAlert = (props: alertType): void => {
  const { cancelledTitle, cancelledText } = props;

  swal({
    title: cancelledTitle || "Cancelled",
    text: cancelledText || "The operation was cancelled.",
    icon: "error",
    buttons: {
      confirm: {
        text: "OK",
        className: "btn btn-danger btn-custom-danger",
      },
    },
  });
};