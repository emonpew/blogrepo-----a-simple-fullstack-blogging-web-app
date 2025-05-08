import ProtectedRoute from "../../../components/ProtectedRoute";

export default function pages() {
  return (
    <ProtectedRoute>
      <div className="custom_container">
        <div className="card bg-base-300 shadow-2xl">
          <form>
            <input
              type="text"
              className="input input-primary"
              placeholder="title"
              required
            />
            <input
              type="text"
              className="input input-primary"
              placeholder="slug"
              required
            />
            <input
              type="text"
              className="input input-primary"
              placeholder="content"
              required
            />
            <button type="submit" className="btn btn-primary">
              submit
            </button>
          </form>
        </div>
      </div>
    </ProtectedRoute>
  );
}
