import Link from "next/link";

export default function page() {
  return (
    <div className="custom_container flex flex-col justify-center items-center h-screen">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body">
          <h2 className="card-title">register</h2>
          {/* <div className="divider"></div> */}
          <form>
            <input type="text" className="input" placeholder="username" />
            <div className="h-2"></div>
            <input type="password" className="input" placeholder="password" />
            <div className="h-2"></div>
            <div className="card-actions justify-center">
              <button className="btn btn-success btn-wide ">register</button>
            </div>
          </form>
          <div className="divider"></div>
          <h2 className="text-sm">
            already have an account?
            <span className="text-primary">
              <Link href={"/login"}> login</Link>
            </span>
          </h2>
        </div>
      </div>
    </div>
  );
}
