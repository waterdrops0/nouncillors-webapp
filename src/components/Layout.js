import { Web3ModalProvider } from '../eth/context/Web3Modal'; 

export const metadata = {
  title: 'Web3Modal',
  description: 'Web3Modal Example'
};

export default function Layout({ children }) {
  return (
    <>
      <Web3ModalProvider>
        {children}
      </Web3ModalProvider>
    </>
  );
}