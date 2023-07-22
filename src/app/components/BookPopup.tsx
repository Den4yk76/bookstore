import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "@/redux/books-slice";
import s from "../styles/BookPopup.module.css";

interface Book {
  id: String;
  name: String;
  price: String;
  category: String;
  description: String;
  picture: String;
}

interface BookPopupProps {
  openedBook?: Partial<Book>;
  heading: String;
  addBookModalOpen: Boolean;
  detailsModalOpen: Boolean;
  setAddBookModalOpen: Function;
  setDetailsModalOpen: Function;
}

const BookPopup = ({
  heading,
  addBookModalOpen,
  detailsModalOpen,
  openedBook,
  setAddBookModalOpen,
  setDetailsModalOpen,
}: BookPopupProps) => {
  const dispatch = useDispatch();

  const initialName = openedBook ? openedBook.name : "";
  const [name, setName] = useState(initialName);

  const initialPrice = openedBook ? openedBook.price : "";
  const [price, setPrice] = useState(initialPrice);

  const initialCategory = openedBook ? openedBook.category : "";
  const [category, setCategory] = useState(initialCategory);

  const initialDescription = openedBook ? openedBook.description : "";
  const [description, setDescription] = useState(initialDescription);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (addBookModalOpen) {
      const newBook = {
        id: `${Date.now()}`,
        name,
        price,
        category,
        description,
        picture:
          "https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg",
      };
      dispatch(addBook(newBook));
      setName("");
      setPrice("");
      setCategory("");
      setDescription("");
      setAddBookModalOpen(false);
    }

    if (detailsModalOpen) {
      const updatedBook = {
        id: openedBook?.id,
        name,
        price,
        category,
        description,
        picture: openedBook?.picture,
      };
      dispatch(updateBook(updatedBook));
      setDetailsModalOpen(false);
    }
  };

  return (
    <div className={s.popupBG}>
      <div className={s.popup}>
        <h2 className={s.AddBookPopupHeading}>{heading}</h2>
        <form onSubmit={handleSubmit} className={s.popupForm}>
          <input
            className={s.formInput}
            type="text"
            placeholder="Name"
            value={name as string}
            onChange={(e) => setName(e.target.value)}
            id="input-name"
          />
          <input
            className={s.formInput}
            type="text"
            placeholder="Price"
            value={price as string}
            onChange={(e) => setPrice(e.target.value)}
            id="input-price"
          />
          <input
            className={s.formInput}
            type="text"
            placeholder="Category"
            value={category as string}
            onChange={(e) => setCategory(e.target.value)}
            id="input-category"
          />
          <input
            className={s.formInput}
            type="text"
            placeholder="Description"
            value={description as string}
            onChange={(e) => setDescription(e.target.value)}
            id="input-description"
          />
          <div className={s.AddBookPopupButtons}>
            <button type="submit" className={s.formAddButton}>
              {openedBook ? "Update" : "Add"}
            </button>
            <button
              type="button"
              className={s.formCancelButton}
              onClick={() => {
                setAddBookModalOpen(false);
                setDetailsModalOpen(false);
              }}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BookPopup;
