// script.js
import { initAPI, fetchFromTMDB } from "./api.js";
import { displayMovies, renderModal } from "./ui.js";

const movieListContainer = document.getElementById("movieList");
const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const modal = document.getElementById("movieModal");
const modalDetailsContainer = document.getElementById("modalDetails");
const closeModalButton = document.querySelector(".close-button");

let currentMovies = [];

const loadPopularMovies = async () => {
  const data = await fetchFromTMDB("movie/popular");
  if (data?.results) {
    currentMovies = data.results;
    displayMovies(currentMovies, movieListContainer, openModal);
  }
};

const searchMovies = async (query) => {
  if (!query) return loadPopularMovies();
  const data = await fetchFromTMDB("search/movie", { query });
  if (data?.results) {
    currentMovies = data.results;
    displayMovies(currentMovies, movieListContainer, openModal);
  }
};

const openModal = async (movieId) => {
  const details = await fetchFromTMDB(`movie/${movieId}`);
  if (details) renderModal(details, modalDetailsContainer, modal);
};

const closeModal = () => {
  modal.style.display = "none";
  modalDetailsContainer.innerHTML = "";
};

searchButton.addEventListener("click", () => {
  searchMovies(searchInput.value.trim());
});
searchInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") searchButton.click();
});
closeModalButton.addEventListener("click", closeModal);
window.addEventListener("click", (e) => {
  if (e.target === modal) closeModal();
});

document.addEventListener("DOMContentLoaded", async () => {
  try {
    await initAPI();
    await loadPopularMovies();
  } catch (err) {
    alert("API 초기화 실패");
  }
});
