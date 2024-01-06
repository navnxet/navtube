import React from 'react';

type IconProps = {
  icon?: any;
  Icon?: React.JSX.Element;
  className?: string;
};

export default function Icon({ icon: Icon, className }: IconProps) {
  return <Icon strokeWidth={2} size={24} className={className} />;
}
