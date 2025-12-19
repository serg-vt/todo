import { Button } from "../button";
import "./Header.scss";

interface HeaderProps {
  title: string;
  buttonTitle: string;
  onButtonClick: () => void;
}

const Header = ({
  title,
  buttonTitle,
  onButtonClick,
}: HeaderProps) => {
  return (
    <header className="header">
      <div className="header__title">{title}</div>
      <Button
        onClick={onButtonClick}
        title={buttonTitle}
      />
    </header>
  )
}

export default Header;
