import swal from "sweetalert";

type alertType = {
  mainTitle?: string;
  mainText?: string;
  deletedTitle?: string;
  deletedText?: string;
  cancelledTitle?: string;
  cancelledText?: string;
};

export const triggerAlert = (props: alertType) => {
  const {mainTitle, mainText, deletedTitle, deletedText, cancelledTitle, cancelledText} = props
  swal({
    title: mainTitle ? mainTitle : "Are you sure?",
    text: mainText ? mainText : "You won't be able to revert this!",
    icon: "warning",
    buttons: {
      cancel: {
        text: "No, cancel!",
        value: null,
        visible: true,
        className: "btn btn-success btn-custom-success",
        closeModal: true,
      },
      confirm: {
        text: "Yes, delete it!",
        value: true,
        visible: true,
        className: "btn btn-danger btn-custom-danger",
        closeModal: true,
      },
    },
    dangerMode: true,
  }).then((willDelete) => {
    if (willDelete) {
      swal({
        title: deletedTitle ? deletedTitle : "Deleted!",
        text: deletedText ? deletedText : "Your file has been deleted.",
        icon: "success",
        buttons: {
          confirm: {
            className: "btn btn-success btn-custom-success",
          },
        },
      });
    } else {
      swal({
        title: cancelledTitle ? cancelledTitle : "Cancelled",
        text: cancelledText ? cancelledText : "Your imaginary file is safe :)",
        icon: "error",
        buttons: {
          confirm: {
            className: "btn btn-danger btn-custom-danger",
          },
        },
      });
    }
  });


//   swal({
//     title: mainTitle ? mainTitle : "Are you sure?",
//     text: mainText,
//     icon: 'warning',
//     buttons: {
//       cancel: {
//         text: 'No, cancel!',
//         value: null,
//         visible: true,
//         className: 'btn custom-cancel-btn',
//         closeModal: true,
//       },
//       confirm: {
//         text: 'Yes, delete it!',
//         value: true,
//         visible: true,
//         className: 'btn custom-confirm-btn',
//         closeModal: true,
//       }
//     },
//     dangerMode: true,
//   }).then((willDelete) => {
//     if (willDelete) {
//       swal({
//         title: deletedTitle,
//         text: deletedText,
//         icon: 'success',
//         buttons: {
//           confirm: {
//             className: 'btn custom-confirm-btn',
//           }
//         }
//       });
//     } else {
//       swal({
//         title: cancelledTitle,
//         text: cancelledText,
//         icon: 'error',
//         buttons: {
//           confirm: {
//             className: 'btn custom-cancel-btn',
//           }
//         }
//       });
//     }
//   });
};
