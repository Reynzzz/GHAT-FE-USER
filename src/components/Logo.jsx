import React from 'react';

const Logo = ({ imageProps, h1Props, h4Props }) => {
  return (
    <>
      <img
        src="/src/assets/icons/logo_mobile.png"
        alt=""
        className={imageProps}
      />
      <div>
        <h1 className={h1Props}>MTsN 1 Kota Palu</h1>
        <h4 className={h4Props}>"Madrasah Maju Bermutu Mendunia"</h4>
      </div>
    </>
  );
};

export default Logo;
