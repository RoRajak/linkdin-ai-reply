
import React from 'react';
import AiIcon from '../../../assets/AiIcon.svg';

import '../../popup/style.css';


interface AIIconProps {
  onClick: () => void;
}

const AIIcon: React.FC<AIIconProps> = ({ onClick }) => {
  return (
    <button
      
      onClick={onClick}
    >
      <img src={AiIcon} alt='Ai icon' className='size-11'/>
      
    </button>
  );
};

export default AIIcon;