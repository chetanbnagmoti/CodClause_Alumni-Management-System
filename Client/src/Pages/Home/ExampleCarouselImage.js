import React from 'react';

function ExampleCarouselImage({ text ,imagepath}) {
  return (
    <div className='container-fluid text-center '>
      <div className='row'>
        <div className='col-12'>
          <img src={imagepath} alt={text} style={{ width: "100%", height: "60vh", objectFit: "cover" }} />
          <div className="caption">{text}</div>
        </div>
      </div>
    </div>
  );
}

export default ExampleCarouselImage;
