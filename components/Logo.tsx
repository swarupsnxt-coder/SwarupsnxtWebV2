
import React from 'react';
import { LOGO } from '../constants';

const Logo: React.FC<{ className?: string }> = ({ className }) => {
  return (
    <>
      {LOGO(className)}
    </>
  );
};

export default Logo;
