import react from 'react';
import styles from '../styles/ComputerCards.module.css';
import Link from 'next/link';


type CardProps = {

    title: string;
    specs: string[];
    price: string;


};

const ComputerCard: React.FC<CardProps> = ({ title, specs, price }) => {
  const specsQueryParam = encodeURIComponent(JSON.stringify(specs));

  return (
    <Link href={`/addToCart?type=${encodeURIComponent(title)}&specs=${specsQueryParam}&price=${price}`} passHref>
      <div className={styles.card} role="link" tabIndex={0}>
        <h2>{title}</h2>
        <ul>
          {specs.map((spec, index) => (
            <li key={index}>{spec}</li>
          ))}
        </ul>
        <p>Price: {price}</p>
      </div>
    </Link>
  );
};


const Computers = () => {
    const gamingPC = {
      title: 'Gaming PC',
      specs: ['Processor: Intel Core i9', 'RAM: 32GB', 'Storage: 1TB SSD'],
      price: '$2000',
    };
  
    const personalPC = {
      title: 'Personal PC',
      specs: ['Processor: Intel Core i5', 'RAM: 16GB', 'Storage: 512GB SSD'],
      price: '$1000',
    };
  
    const businessPC = {
      title: 'Business PC',
      specs: ['Processor: Intel Core i7', 'RAM: 16GB', 'Storage: 1TB SSD'],
      price: '$1500',
    };
  
    return (
      <div className={styles.container}>
        <ComputerCard {...gamingPC} />
        <ComputerCard {...personalPC} />
        <ComputerCard {...businessPC} />
      </div>
    );
  };
  
  export default Computers;