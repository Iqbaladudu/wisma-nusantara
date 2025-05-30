import React from 'react';
import { motion } from 'framer-motion';
import { colors } from '../../styles/colors';

interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}

const buttonVariants = {
  primary: {
    backgroundColor: colors.primary[600],
    color: 'white',
    border: `2px solid ${colors.primary[600]}`,
  },
  secondary: {
    backgroundColor: colors.secondary[600],
    color: 'white',
    border: `2px solid ${colors.secondary[600]}`,
  },
  outline: {
    backgroundColor: 'transparent',
    color: colors.primary[600],
    border: `2px solid ${colors.primary[600]}`,
  },
  ghost: {
    backgroundColor: 'transparent',
    color: colors.neutral[700],
    border: '2px solid transparent',
  },
};

const sizeVariants = {
  sm: 'px-4 py-2 text-sm',
  md: 'px-6 py-3 text-base',
  lg: 'px-8 py-4 text-lg',
};

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  disabled = false,
  onClick,
  className = '',
}) => {
  return (
    <motion.button
      whileHover={{ scale: disabled ? 1 : 1.05 }}
      whileTap={{ scale: disabled ? 1 : 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      style={buttonVariants[variant]}
      className={`
        rounded-lg font-semibold transition-all duration-200
        focus:outline-none focus:ring-4 focus:ring-opacity-50
        disabled:opacity-50 disabled:cursor-not-allowed
        hover:shadow-lg active:shadow-md
        ${sizeVariants[size]}
        ${className}
      `}
      disabled={disabled}
      onClick={onClick}
    >
      {children}
    </motion.button>
  );
};
