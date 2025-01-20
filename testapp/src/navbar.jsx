import "./Navbar.css";

function Navbar() {
    return (
    <div>
      <nav className="navbar">
        <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
        </ul>
        </nav>
      </div>
    );
  }
  export default Navbar;