"use client";

import { useState } from "react";
import BookList from "@/app/components/BooksList";
import { useAppSelector } from "@/redux/store";
import s from "./page.module.css";
import BookPopup from "./components/BookPopup";

export default function Home() {
  const [detailsModalOpen, setDetailsModalOpen] = useState(false);
  const [addBookModalOpen, setAddBookModalOpen] = useState(false);
  const openedBook = useAppSelector((state) => state.openedBook);

  return (
    <div className={s.container}>
      <button
        className={s.addButton}
        type="button"
        onClick={() => setAddBookModalOpen(true)}
      >
        Add book
      </button>
      <BookList
        detailsModalOpen={detailsModalOpen}
        setDetailsModalOpen={setDetailsModalOpen}
      />
      {detailsModalOpen ? (
        <BookPopup
          heading={"Book Details"}
          openedBook={openedBook}
          detailsModalOpen={detailsModalOpen}
          setDetailsModalOpen={setDetailsModalOpen}
          addBookModalOpen={addBookModalOpen}
          setAddBookModalOpen={setAddBookModalOpen}
        />
      ) : addBookModalOpen ? (
        <BookPopup
          heading={"Add New Book"}
          detailsModalOpen={detailsModalOpen}
          setDetailsModalOpen={setDetailsModalOpen}
          addBookModalOpen={addBookModalOpen}
          setAddBookModalOpen={setAddBookModalOpen}
        />
      ) : null}
    </div>
  );
}
