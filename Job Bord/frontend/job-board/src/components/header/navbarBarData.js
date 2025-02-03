import PersonIcon from '@mui/icons-material/Person';
import HomeIcon from '@mui/icons-material/Home';
import CallIcon from '@mui/icons-material/Call';
import WorkIcon from '@mui/icons-material/Work';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import NotificationsIcon from '@mui/icons-material/Notifications';
import QueueIcon from '@mui/icons-material/Queue';
import LibraryAddCheckIcon from '@mui/icons-material/LibraryAddCheck';
import LightbulbIcon from '@mui/icons-material/LightbulbOutlined';
import MiscellaneousServicesIcon from '@mui/icons-material/MiscellaneousServices';

const mutualData = [
  {
    name: "Home",
    logo: HomeIcon,
    link: "/"
  },
  {
    name: "Notifications",
    logo: NotificationsIcon,
    link: "/notification"
  },
  {
    name: "Profile",
    logo: PersonIcon,
    link: "/profile"
  }
]

export const landingNavData = [
  mutualData[0],
  {
    name: "Services",
    logo: MiscellaneousServicesIcon,
    link: "#services"
  },
  {
    name: "About",
    logo: LightbulbIcon,
    link: "#about"
  },
  {
    name: "Contact",
    logo: CallIcon,
    link: "#contact"
  }
]

export const seekerNavData = [
  mutualData[0],
  {
    name: "Jobs",
    logo: WorkIcon,
    link: "/job"
  },
  {
    name: "My Applications",
    logo: DomainVerificationIcon,
    link: "/apply/my"
  },
  mutualData[1],
  mutualData[2] 
]

export const employerNavData = [
  mutualData[0],
  {
    name: "Posted Jobs",
    logo: LibraryAddCheckIcon,
    link: "/job/my"
  },
  {
    name: "Add Job",
    logo: QueueIcon,
    link: "/job/post"
  },
  mutualData[1],
  mutualData[2]
]
