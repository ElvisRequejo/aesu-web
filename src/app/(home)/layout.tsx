import { CustomLayout } from "~/layout/custom-layout";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <CustomLayout bg="primary">{children}</CustomLayout>;
};

export default Layout;
