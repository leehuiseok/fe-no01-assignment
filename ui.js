// ui.js
import { IMAGE_BASE_URL, fetchFromTMDB } from "./api.js";

export const displayMovies = (movies, container, onCardClick) => {
  container.innerHTML = "";

  if (!movies || movies.length === 0) {
    container.innerHTML = "<p>영화를 찾을 수 없습니다.</p>";
    return;
  }

  movies.forEach((movie) => {
    const movieCard = document.createElement("div");
    movieCard.classList.add("movie-card");
    movieCard.dataset.movieId = movie.id;

    const posterPath = movie.poster_path
      ? `${IMAGE_BASE_URL}${movie.poster_path}`
      : "https://via.placeholder.com/200x300?text=No+Image";
    const overview = movie.overview || "요약 정보가 없습니다.";
    const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

    movieCard.innerHTML = `
      <img src="${posterPath}" alt="${movie.title} 포스터">
      <h3>${movie.title}</h3>
      <p class="rating">평점: ${rating}</p>
      <p>${overview}</p>
    `;

    movieCard.addEventListener("click", () => onCardClick(movie.id));
    container.appendChild(movieCard);
  });
};

export const renderModal = (movie, container, modal) => {
  const posterPath = movie.poster_path
    ? `${IMAGE_BASE_URL}${movie.poster_path}`
    : "https://via.placeholder.com/200x300?text=No+Image";
  const genres = movie.genres?.map((g) => g.name).join(", ") || "정보 없음";
  const releaseDate = movie.release_date || "정보 없음";
  const runtime = movie.runtime ? `${movie.runtime}분` : "정보 없음";
  const overview = movie.overview || "상세 줄거리가 없습니다.";
  const rating = movie.vote_average ? movie.vote_average.toFixed(1) : "N/A";

  container.innerHTML = `
    <img src="${posterPath}" alt="${movie.title} 포스터">
    <h2>${movie.title}</h2>
    <p><strong>개봉일:</strong> ${releaseDate}</p>
    <p><strong>장르:</strong> ${genres}</p>
    <p><strong>상영 시간:</strong> ${runtime}</p>
    <p><strong>평점:</strong> <span class="rating">${rating}</span></p>
    <p><strong>줄거리:</strong> ${overview}</p>
  `;

  modal.style.display = "block";
};
