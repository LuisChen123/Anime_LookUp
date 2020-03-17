import React, { useState, useEffect } from 'react';

export default function AnimeDetailPage(props) {
  useEffect(() => {
    console.log(props.match.params);
    console.log(props.history.location.state);
  }, []);
  return (
    <>
      <div className="container">hello,this is detial page</div>
    </>
  );
}
