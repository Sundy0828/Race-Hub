import Avatar from "@mui/material/Avatar";
import PersonIcon from "@mui/icons-material/Person";

const getInitials = (displayName: string = "") => {
  return displayName
    .trim()
    .split(/\s+/) // Split by spaces (handles multiple)
    .slice(0, 2) // Take first two words
    .map((name) => name[0]?.toUpperCase() ?? "") // Grab first letter & uppercase
    .join("");
};

type Props = {
  profileImgUrl?: string;
  displayName?: string;
  className?: string;
};

const UserAvatar = ({ profileImgUrl, displayName, className }: Props) => {
  const initials = getInitials(displayName);

  return (
    <Avatar className={className} src={profileImgUrl}>
      {initials ? initials : <PersonIcon />}
    </Avatar>
  );
};

export default UserAvatar;
