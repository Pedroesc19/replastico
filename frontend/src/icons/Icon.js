import {
  StarIcon,
  EnvelopeIcon,
  LockClosedIcon,
  EyeIcon,
  EyeSlashIcon,
  GlobeAltIcon,
} from "@heroicons/react/24/solid";

const iconRegistry = {
  star: StarIcon,
  envelope: EnvelopeIcon,
  lock: LockClosedIcon,
  eye: EyeIcon,
  eyeSlash: EyeSlashIcon,
  leaf: GlobeAltIcon,
};

const Icon = ({ name, className }) => {
  const Component = iconRegistry[name];
  if (!Component) return null;
  return <Component className={className} width={24} height={24} />;
};

export { iconRegistry };
export default Icon;
