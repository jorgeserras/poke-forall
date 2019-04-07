import React from 'react';

export default function Page2() {
  return (
    <div component="section" className="page-wrapper page2">
      <div className="page text-center" >
        <h2 key="title">NOTICE</h2>
        <span key="line" className="separator" />
        <div type="bottom" className="info-content" key="content">
          <p className="main-info" key="1">Feel free to explore each generation to find every pokemon-species and pokemon particularities. Authentication is needed! </p>
          <p className="main-info" key="2"> Data is retrieved from a server when visiting each page and cached in the browser's local storage. After 10 minutes since the application has been visited, the user is advised to refresh or revisit the app. An automatic storage clear is performed. Users can also clear the local storage manually. </p>
        </div>
      </div>
    </div>);
}
