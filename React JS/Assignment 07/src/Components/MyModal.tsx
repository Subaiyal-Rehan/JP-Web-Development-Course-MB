import { useEffect, useRef, useState } from "react";
import SaveIcon from "@mui/icons-material/Save";
import CloseIcon from '@mui/icons-material/Close';
import { CircularProgress } from "@mui/material";

function MyModal(props: any) {
  const closeRef = useRef<any>();
  const [loading, setLoading] = useState(false);
  const [updatedValues, setUpdatedValues] = useState<any>({
    postId: props.data.postId,
    id: props.data.id,
    name: props.data.name,
    email: props.data.email,
    body: props.data.body,
  });

  useEffect(() => {
    setUpdatedValues({
      postId: props.data.postId,
      id: props.data.id,
      name: props.data.name,
      email: props.data.email,
      body: props.data.body,
    });
  }, [props.data]);

  useEffect(() => {
    if (props.isOpen) {
      closeRef.current.click();
      setLoading(false);
    }
  }, [props.isOpen]);

  const handleSaveChanges = () => {
    props.onUpdateData(updatedValues);
    setLoading(true);
  };

  const handleCreateData = () => {
    props.onCreateData(updatedValues)
    setLoading(true);
  }
  

  return (
    <>
      <div
        className="modal fade"
        id={props.id}
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        data-bs-backdrop="static"
        data-bs-keyboard="false"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit the Comment
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body px-3">
              <div className="d-flex justify-content-between align-items-center gap-2">
                <h2 className="fs-5">ID:</h2>
                <input
                  className="w-75 fs-5 px-3"
                  type="text"
                  disabled
                  value={props.data.id}
                />
              </div>
              <hr />
              <div className="d-flex mt-4 justify-content-between align-items-center gap-2">
                <h2 className="fs-5">Name:</h2>
                <input
                  className="w-75 fs-5 px-3"
                  type="text"
                  value={updatedValues.name}
                  onChange={(e) =>
                    setUpdatedValues({ ...updatedValues, name: e.target.value })
                  }
                />
              </div>
              <div className="d-flex mt-4 justify-content-between align-items-center gap-2">
                <h2 className="fs-5">Email:</h2>
                <input
                  className="w-75 fs-5 px-3"
                  type="text"
                  value={updatedValues.email}
                  onChange={(e) =>
                    setUpdatedValues({
                      ...updatedValues,
                      email: e.target.value,
                    })
                  }
                />
              </div>
              <div className="d-flex mt-4 justify-content-between align-items-center gap-2">
                <h2 className="fs-5">Body:</h2>
                <textarea
                  className="w-75 fs-5 px-3"
                  rows={4}
                  value={updatedValues.body}
                  onChange={(e) =>
                    setUpdatedValues({ ...updatedValues, body: e.target.value })
                  }
                ></textarea>
              </div>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={closeRef}
              >
                Close <CloseIcon />
              </button>
              <button
                type="button"
                onClick={props.data.id == null ? handleCreateData : handleSaveChanges}
                className="btn btn-primary d-flex gap-2"
              >
                Save changes{" "}
                {loading ? <CircularProgress size={24} color="inherit" /> : <SaveIcon />}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyModal;
