interface LogoutButtonProps {
  onLogout?: () => void;
}

export function LogoutButton({ onLogout }: LogoutButtonProps) {
  const handleClick = () => {
    if (onLogout) {
      onLogout();
    }
  };

  return <button onClick={handleClick}>Logout</button>;
}

