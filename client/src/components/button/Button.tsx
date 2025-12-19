import classNames from "classnames";
import "./Button.scss";

enum ButtonVariant {
  Primary = "primary",
  Secondary = "secondary",
}

interface ButtonProps {
  title: string;
  onClick: () => void;
  variant?: ButtonVariant;
}

const Button = ({
  onClick,
  title,
  variant = ButtonVariant.Primary,
}: ButtonProps) => {
  return (
    <button
      className={
        classNames("button", {
          "button--primary": variant === ButtonVariant.Primary,
          "button--secondary": variant === ButtonVariant.Secondary,
        })
      }
      onClick={onClick}
    >
      {title}
    </button>
  )
}

export default Button;
