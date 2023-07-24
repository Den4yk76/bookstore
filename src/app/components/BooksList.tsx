import React, { ReactEventHandler, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/store";
import { fetchBooks, deleteBook, setOpenedBook } from "@/redux/books-slice";
import Image from "next/image";
import s from "../styles/BookList.module.css";

interface BookListProps {
  detailsModalOpen: boolean;
  setDetailsModalOpen: Function;
}

const mockBooks = [
  {
    id: "1",
    name: "Book 1",
    price: "9.99",
    category: "Fiction",
    description: "Pellentesque ac ligula in tellus feugiat ultrices.",
    picture:
      "https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg",
  },
  {
    id: "2",
    name: "Book 2",
    price: "14.99",
    category: "Non-fiction",
    description: "Pellentesque ac ligula in tellus feugiat ultrices.",
    picture:
      "https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg",
  },
  {
    id: "3",
    name: "Book 3",
    price: "14.99",
    category: "Non-fiction",
    description: "Pellentesque ac ligula in tellus feugiat ultrices.",
    picture:
      "https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg",
  },
  {
    id: "4",
    name: "Book 4",
    price: "14.99",
    category: "Non-fiction",
    description: "Pellentesque ac ligula in tellus feugiat ultrices.",
    picture:
      "https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg",
  },
  {
    id: "5",
    name: "Book 5",
    price: "14.99",
    category: "Non-fiction",
    description: "Pellentesque ac ligula in tellus feugiat ultrices.",
    picture:
      "https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg",
  },
  {
    id: "6",
    name: "Book 6",
    price: "14.99",
    category: "Non-fiction",
    description: "Pellentesque ac ligula in tellus feugiat ultrices.",
    picture:
      "https://thewritelife.com/wp-content/uploads/2019/08/How-to-format-a-book.jpg",
  },
];

const BookList = ({ setDetailsModalOpen }: BookListProps) => {
  const dispatch = useDispatch();
  const books = useAppSelector((state) => state.books);

  useEffect(() => {
    dispatch(fetchBooks(mockBooks));
  }, [dispatch]);

  const handleDelete = (id: string) => {
    dispatch(deleteBook(id));
  };

  const bookClickHandler = (e: React.SyntheticEvent) => {
    setDetailsModalOpen(true);
    dispatch(setOpenedBook(e.currentTarget.id));
  };

  return (
    <div className={s.books}>
      <ul className={s.booksSet}>
        {books.map((book) => (
          <li key={book.id as React.Key} className={s.booksSet__item}>
            <a id={book.id} className={s.book} onClick={bookClickHandler}>
              <div className={s.book__overlay}>
                <Image
                  className={s.Image}
                  src={book.picture}
                  alt="Book picture"
                  width={450}
                  height={400}
                />
                <div className={s.book__description}>
                  <p>{book.description}</p>
                </div>
              </div>
              <div className={s.bookBottom}>
                <div>
                  <h2 className={s.book__head}>{book.name}</h2>
                </div>
                <div className={s.bookBottomMenu}>
                  <p className={s.book__category}>{book.category}</p>
                  <p className={s.book__price}>${book.price}</p>
                </div>
              </div>
            </a>
            <button
              className={s.deleteButton}
              id={book.id}
              onClick={() => {
                handleDelete(book.id);
              }}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default BookList;
