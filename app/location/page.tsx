import Sidebar from "../components/sidebar";
import Header from "../components/header";
import MainTitle from "../components/mainTitle";

export default function Location() {
  return (
    <div className="container">
      {/* Header */}
      <Header />

      {/* Main Layout */}
      <div className="main-layout">
        {/* Sidebar */}
        <Sidebar />

        <main className="main-content">
          {/* Main Title */}
          <MainTitle />
        </main>
      </div>
    </div>
  );
}
