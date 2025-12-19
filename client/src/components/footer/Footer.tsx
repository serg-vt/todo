import "./Footer.scss";

interface AddButtonProps {
  onClick: () => void;
}

interface FooterProps {
  onClick: () => void;
}

const AddButton = ({
  onClick
}: AddButtonProps) => {
  return (
    <button
      className="footer__add-button"
      onClick={onClick}
    >
      +
    </button>
  )
}

const Footer = ({
  onClick
}: FooterProps) => {
  return (
    <footer className="footer">
      <AddButton
        onClick={onClick}
      />
    </footer>
  )
}

export default Footer;
