import React from 'react';
function PageNotFound() {
    return ( 
         <div className='container text-center mb-5 p-5'>
        <h1 className="mt-5">404 Not Found</h1>
        <p>
          Sorry,the page you are looking for does not exist.
        </p>
        <button
          className="p-2 btn btn-primary fs-5 mb-5"
          style={{ width: "20%", margin: "0 auto",  }}
        >
          
        </button>
       </div>
     );
}

export default PageNotFound;