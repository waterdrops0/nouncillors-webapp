
import NavGroup from './NavGroup';
import NavGroupItem from './NavGroupItem';

const Nav = ({ navigation }) => {
  return (
    <ul className="flex gap-8 h-full max-lg:hidden">
      {navigation.map((group, index) => (
        <NavGroup key={index} title={group.title}>
          {group.items.map((item, itemIndex) => (
            <NavGroupItem key={itemIndex} href={item.href}>{item.name}</NavGroupItem>
          ))}
        </NavGroup>
      ))}
    </ul>
  );
};

export default Nav;
