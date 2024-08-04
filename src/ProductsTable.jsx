export default function ProductsTable({
  products,
  handelUpdatedProduct,
  deleteProductByIndex,
}) {
  return (
    <>
      <div id="product-tabel-container" className="container my-5">
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
              <tr>
                <th>Index</th>
                <th>Name</th>
                <th>Category</th>
                <th>Price</th>
                <th>Disc</th>
                <th>Update</th>
                <th>Delete</th>
              </tr>
            </thead>
            <tbody id="tabel-body">
              {products.map((item, index) => (
                <tr key={index}>
                  <th>{index + 1}</th>
                  <td>{item.name}</td>
                  <td>{item.cat}</td>
                  <td>{item.price}</td>
                  <td>{item.description}</td>
                  <td>
                    <button
                      className="btn btn-outline-success"
                      onClick={() => handelUpdatedProduct(item, index)}
                    >
                      <i className="fa-solid fa-pen-to-square"></i>
                    </button>
                  </td>
                  <td>
                    <button
                      className="btn btn-outline-danger"
                      onClick={() => deleteProductByIndex(item)}
                    >
                      <i className="fa-solid fa-trash"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
