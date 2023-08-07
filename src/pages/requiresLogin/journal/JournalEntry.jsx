import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash, faShare } from "@fortawesome/free-solid-svg-icons";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import axios from "axios";

export default function JournalEntry(props) {
  const [isEditing, setIsEditing] = useState(true); 
  const [editEntry, setEditEntry] = useState({
    res1: props.res1,
    res2: props.res2,
    res3: props.res3,
    share: props.share,
  }); 
  const [editId, setEditId] = useState(); 

  const queryClient = useQueryClient(); 

  const [shareMessageTrue, setShareMessageTrue] = useState(false);
  const [message, setMessage] = useState(""); 

  const deletePostMutation = useMutation({
    mutationFn: async (id) => {
      const response = await axios.delete(
        `https://mighty-mini-minds-backend.onrender.com/entries/${id}`
      );
      return response.data; 
    },
    onSuccess: () => {
      queryClient.invalidateQueries("entries"); 
    },
  });

  const [confirmDelete, setConfirmDelete] = useState(false); 

  function handleConfirmDelete() {
    setConfirmDelete(true);
  }

  const handleDeleteEntry = async (id) => {
    try {
      await deletePostMutation.mutateAsync(id); 
    } catch (error) {
      console.error(error);
    }
    setConfirmDelete(false);
  };

  const editPostMutation = useMutation({
    mutationFn: async (entry) => {
      const response = await axios.patch(
        `https://mighty-mini-minds-backend.onrender.com/entries/${editId}`,
        entry
      );
      return response.data; 
    },
    onSuccess: () => {
      queryClient.invalidateQueries("entries"); 
    },
    onError: (error) => {
      console.error(error.message); 
    },
  });

  const handleEdit = (id) => {
    setEditId(id); 
    setIsEditing(!isEditing); 
  };

  const handleInputChange = (event) => {
    setEditEntry({ ...editEntry, [event.target.name]: event.target.value });
  };

  const handleEditEntry = async () => {
    const entry = {
      answer_one: editEntry.res1,
      answer_two: editEntry.res2,
      answer_three: editEntry.res3,
      share: false,
    };
    try {
      await editPostMutation.mutateAsync(entry); 
      setIsEditing(!isEditing); 
    } catch (error) {
      console.error(error);
    }
  };

  // send an email to the user's trusted person
  const handleEmail = async () => {
    try {
      const response = await axios.post(
        `https://mighty-mini-minds-backend.onrender.com/sendemail/${editId}`
      );
      console.log(response);
    } catch (error) {
      console.error("Failed to send email:", error);
    }
  };

  // will currently only share from journal page if the entry is editted
  async function handleShare(id) {
    setEditId(id); 
    const entry = {
      share: true, 
    };
    try {
      await editPostMutation.mutateAsync(entry);
      handleEmail(); 
      setShareMessageTrue(true); 
      setMessage(
        "Thanks for sharing your entry! It's on its way to your trusted person!"
      );
    } catch (error) {
      console.error(error);
    }
  }

  function shareMessage() {
    setMessage("Would you like to share your thoughts with someone?");
    setShareMessageTrue(true);
  }
  useEffect(() => {
    const timeout = setTimeout(() => {
      setShareMessageTrue(false);
    }, 5000);

    return () => {
      clearTimeout(timeout);
    };
  }, [shareMessageTrue]);

  return (
    <>
      {" "}
      {isEditing ? (
        <>
          <h4 className="font-bold ml-5">{props.date}</h4>
          <div className="flex flex-col justify-start items-start bg-skin-input mx-4 mb-4 p-2 rounded-lg shadow-md">
            <h2 className="font-bold">{props.q1}</h2>
            <p className="break-words w-full" data-testid="journal-entry-1">
              {props.res1}
            </p>
            <br />
            <h2 className="font-bold">{props.q2}</h2>
            <p className="break-words w-full">{props.res2}</p>
            <br />
            <h2 className="font-bold">{props.q3}</h2>
            <p className="break-words w-full">{props.res3}</p>
            <div className="flex flex-row item-start justify-end w-full gap-5 mt-4 mb-2">
              {props.share === false ? (
                <button
                  aria-label="share-button"
                  onMouseOver={shareMessage}
                  onClick={() => handleShare(props.id)}
                  className="rounded-md w-10 h-10 bg-skin-secondary text-white transition-colors duration-300 ease-in-out transform hover:scale-125"
                >
                  <FontAwesomeIcon icon={faShare} />
                </button>
              ) : null}
              <button
                aria-label="edit-button"
                onClick={() => handleEdit(props.id)}
                className="rounded-md w-10 h-10 bg-skin-secondary text-white  transition-colors duration-300 ease-in-out transform hover:scale-125 "
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
              {confirmDelete === true ? (<button
                aria-label="delete-button"
                onClick={() => handleDeleteEntry(props.id)}
                className="text-xs rounded-md w-10 h-10 bg-skin-secondary mr-2 text-white transition-colors duration-300 ease-in-out transform hover:scale-125"
              >
               sure?
              </button>): <button
                aria-label="confirm-button"
                onClick={() => handleConfirmDelete()}
                className="rounded-md w-10 h-10 bg-skin-secondary mr-2 text-white transition-colors duration-300 ease-in-out transform hover:scale-125"
              >
                 <FontAwesomeIcon icon={faTrash} />
              </button> }
            </div>
            {shareMessageTrue ? <p>{message}</p> : null}
          </div>
        </>
      ) : (
        <div className="flex flex-col justify-start items-start bg-skin-input mx-4 mb-4 p-2 rounded-lg shadow-md">
          <h1 className="font-bold mb-4">Edit Your Journal</h1>
          <h2 className="font-bold">{props.q1}</h2>
          <textarea
            type="text"
            rows="4"
            className="border-2 border-skin-primary w-full rounded-md p-1"
            name="res1"
            value={editEntry.res1}
            onChange={handleInputChange}
          />
          <br />
          <h2 className="font-bold">{props.q2}</h2>
          <textarea
            type="text"
            rows="4"
            name="res2"
            className="border-2 border-skin-primary w-full rounded-md  p-1"
            value={editEntry.res2}
            onChange={handleInputChange}
          />
          <br />
          <h2 className="font-bold">{props.q3}</h2>
          <textarea
            type="text"
            rows="4"
            className="border-2 border-skin-primary w-full rounded-md p-1 mb-4"
            name="res3"
            value={editEntry.res3}
            onChange={handleInputChange}
          />
          <div className="flex flex-row item-start justify-end w-full gap-5 mt-2 mb-5">
            <button
              aria-label="cancel-edit-button"
              onClick={handleEdit}
              className="rounded-md w-10 h-10 bg-skin-secondary text-white transition-colors duration-300 ease-in-out transform hover:scale-125"
            >
              X
            </button>
            <button
              aria-label="cancel-edit-button"
              onClick={handleEditEntry}
              className="rounded-md w-10 h-10 bg-skin-secondary text-white mr-5 transition-colors duration-300 ease-in-out transform hover:scale-125"
            >
              ✓
            </button>
          </div>
        </div>
      )}
    </>
  );
}
