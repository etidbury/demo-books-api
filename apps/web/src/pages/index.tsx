export default function Homepage() {
  return (
    <section>
      <h2>Books Search</h2>

      <form action="/results" method="get">
        <label htmlFor="q">Search for books by author:</label>
        <input type="search" name="q" />
        <button type="submit">Search</button>
      </form>
    </section>
  );
}
