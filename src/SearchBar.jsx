export default function SearchBar({ filterProducts }) {
  return (
    <div className="my-5 w-75 mx-auto">
      <input
        type="text"
        className="form-control"
        id="search-input"
        onChange={filterProducts}
        placeholder="search by product name.."
      />
    </div>
  );
}
