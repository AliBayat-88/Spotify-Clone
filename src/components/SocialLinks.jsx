import SocialIcon from "./SocialIcon";
import { socialIcons } from './SocialIcons.jsx'


function SocialLinks() {
  return (
    <ul className="flex justify-center space-x-4">
      {socialIcons.map(({ name, icon , link }) => (
        <SocialIcon link={link} key={name} name={name}>
          {icon}
        </SocialIcon>
      ))}
    </ul>
  );
}

export default SocialLinks;
