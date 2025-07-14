import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function RedirectHandler() {
  const { shortcode } = useParams();

  useEffect(() => {
    fetch(`http://localhost:5000/api/resolve/${shortcode}`)
      .then(res => res.json())
      .then(data => {
        window.location.href = data.longUrl;
      })
      .catch(() => alert("Redirection failed"));
  }, []);

  return <div>Redirecting...</div>;
}
