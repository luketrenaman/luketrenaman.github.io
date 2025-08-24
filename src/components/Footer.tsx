import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGithub, faLinkedin, faItchIo, faBandcamp, faStackOverflow } from '@fortawesome/free-brands-svg-icons';

export const Footer = () => {
  return (
    <footer className="flex gap-10 text-4xl w-full justify-center bottom-[-8rem] h-[5rem] absolute">
      <a href="https://github.com/luketrenaman" title="GitHub">
        <FontAwesomeIcon icon={faGithub} />
      </a>
      <a href="https://www.linkedin.com/in/luke-trenaman-8854a11a3/" title="LinkedIn">
        <FontAwesomeIcon icon={faLinkedin} />
      </a>
      <a href="https://luketrenaman.itch.io/" title="itch.io">
        <FontAwesomeIcon icon={faItchIo} />
      </a>
      <a href="https://luketrenaman.bandcamp.com/" title="BandCamp">
        <FontAwesomeIcon icon={faBandcamp} />
      </a>
      <a href="https://stackoverflow.com/users/17460969/luke-trenaman" title="StackOverflow">
        <FontAwesomeIcon icon={faStackOverflow} />
      </a>
    </footer>
  );
};

