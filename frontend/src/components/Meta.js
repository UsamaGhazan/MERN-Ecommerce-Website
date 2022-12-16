import React from 'react';
import { Helmet } from 'react-helmet';

const Meta = ({ title, description, keywords }) => {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name='description' content={description} />
      <meta name='keywords' content={description} />
    </Helmet>
  );
};
Meta.defaultProps = {
  title: 'Welcome to Proshop',
  description:'Best selling products',
  keywords: 'electronics,buy electronics, cheap electronics',
};

export default Meta;
