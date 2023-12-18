import Button from "./Button";
import Delegated from "./Delegated";
import Menu from "./Menu/index.js";
import Nav from "./Nav/index.js";
import Socials from "./Socials";


const navigation = [
  {
    title: "Governance",
    items: [
      {
        name: "Welcome",
        href: "https://docs.google.com/document/d/1zEdaZL_oF9-bG7h2mimb8PB2DNMFVoVr24OFF5eoeE4/edit",
      },
      {
        name: "Members",
        href: "https://docs.google.com/spreadsheets/d/1gxXEoxUhHbcRZVSIB3mVbmRp3lfv-clnevIMuqiY2Jo/edit#gid=0",
      },
      {
        name: "Guidelines",
        href: "https://docs.google.com/document/d/1NZXpxwJcTfjuafqRaSfl8TMJ8uQR2tX_JFSn5WO5nzg/edit",
      },
      { name: "Proposal", href: "https://hackmd.io/tm6WjUwmT-6tFyiNtZ55jQ" },
    ],
  },
  {
    title: "Programs",
    items: [
      {
        name: "Coordinape Rounds",
        href: "https://docs.google.com/spreadsheets/d/1LNVP0DBLPdoxgRy6Cb0egU7TSaljkheJ0idT_JP6koY/edit#gid=1104529391",
      },
      {
        name: "Grant Guidelines",
        href: "https://docs.google.com/document/d/1-ILWgan1SweRZxRlT0xkQnebh7K5-z1cCn-50qk7KzY/edit",
      },
    ],
  },
  {
    title: "Tools",
    items: [
      {
        name: "Toga Template",
        href: "https://docs.google.com/document/d/1bhQyEIi56qoyjM4m8nZRrmmm59HPz9mO3RjUOnredRM/edit?usp=sharing",
      },
      { name: "Toga Time", href: "https://togatime.cloudnouns.com/" },
      {
        name: "Delegated Nouns",
        href: "https://docs.google.com/document/d/1tmvCRo4HSv4cGU1Z_Y9BOVOJlG0vrAa1BDDb3RGW4YM/edit",
      },
      {
        name: "How to Delegate",
        href: "https://docs.google.com/document/d/1MDYV56Lmm_qd18O7hQLYD3gTZoISzm0ZpONGbK7Gp-Q/edit",
      },
    ],
  },
];

const Header = () => {
  return (
    <header className="flex w-full p-8 max-sm:p-6 justify-between">
      <div className="flex items-center gap-12">
        <a href="/">
          <img
            src="/logo.webp"
            alt="Nouncil Logo"
            className="w-16 h-16 select-none"
            draggable={false}
          />
        </a>
        <div className="max-md:hidden">
          <Delegated />
        </div>
      </div>
      <nav className="relative flex items-center gap-12">
        <Nav navigation={navigation} />
        <div className="max-md:hidden">
          <Socials />
        </div>
        <Button
          href="https://nouns.wtf/delegate?to=0xcC2688350d29623E2A0844Cc8885F9050F0f6Ed5"
        >
          Delegate
        </Button>
        <Menu navigation = {navigation} />
      </nav>
    </header>
  );
};

export default Header;