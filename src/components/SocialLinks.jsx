import SocialIcon from "./SocialIcon";
import { socialIcons } from './SocialIcons.jsx'


function SocialLinks() {
  return (
    <ul className="flex justify-center space-x-6">
      {socialIcons.map(({ name, icon }) => (
        <SocialIcon key={name} name={name}>
          {icon}
        </SocialIcon>
      ))}
    </ul>
  );
}

export default SocialLinks;
