import React from 'react';
import ContentLoader from 'react-content-loader';
const Skeleton = () => {
  return (
    <ContentLoader
      speed={2}
      width={280}
      height={470}
      viewBox="0 0 280 470"
      backgroundColor="#f3f3f3"
      foregroundColor="#ecebeb">
      <circle cx="121" cy="131" r="122" />
      <rect x="0" y="263" rx="4" ry="4" width="261" height="30" />
      <rect x="0" y="378" rx="0" ry="0" width="104" height="38" />
      <rect x="120" y="375" rx="19" ry="19" width="144" height="40" />
      <rect x="0" y="301" rx="0" ry="200" width="258" height="63" />
    </ContentLoader>
  );
};

export default Skeleton;
