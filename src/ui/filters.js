
export function filtrerEtRechercher(series, texte, genre) {
  const recherche = texte.toLowerCase().trim();

  return series.filter((serie) => {
    const matchNom = serie.name.toLowerCase().includes(recherche);
    const matchGenre =
      genre === "Tous les genre" || serie.genres.includes(genre);

    return matchNom && matchGenre;
  });
}
