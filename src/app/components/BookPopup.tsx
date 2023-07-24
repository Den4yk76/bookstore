import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addBook, updateBook } from "@/redux/books-slice";
import { Book } from "@/app/types/Book";
import s from "../styles/BookPopup.module.css";

interface BookPopupProps {
  openedBook?: Partial<Book>;
  heading: string;
  addBookModalOpen: boolean;
  detailsModalOpen: boolean;
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

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    if (addBookModalOpen) {
      const newBook = {
        id: `${Date.now()}`,
        name: name?.trim(),
        price: price?.trim(),
        category: category?.trim(),
        description: description?.trim(),
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
        name: name?.trim(),
        price: price?.trim(),
        category: category?.trim(),
        description: description?.trim(),
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
            required
            className={s.formInput}
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            id="input-name"
          />
          <input
            required
            className={s.formInput}
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            id="input-price"
          />
          <input
            required
            className={s.formInput}
            type="text"
            placeholder="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            id="input-category"
          />
          <input
            required
            className={s.formInput}
            type="text"
            placeholder="Description"
            value={description}
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
