import Layout from "../../components/shared/Layout/Layout";
import "./Watchlist.css";
import Show from "../../components/Show/Show";
import { useState, useEffect } from "react";
import { getUserWatchlist } from "../../services/users";
import "./Watchlist.css";

const Watchlist = ({ user }) => {
  const [watchlistShows, setWatchlistShows] = useState([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const fetchWatchlist = async () => {
      const shows = await getUserWatchlist(user.id);
      setWatchlistShows(shows);
      setIsLoaded(true);
    };
    fetchWatchlist();
  }, []);
  
  const showJSX = watchlistShows.map((show, index) => (
    <Show _id={show._id} title={show.title} imgURL={show.imgURL} key={index} />
  ));

  if (!isLoaded) {
    return <h1>Loading...</h1>;
  }

  return (
    <Layout user={user}>
      <div className="shows">
        {showJSX}
      </div>
    </Layout>
  );
};

export default Watchlist;