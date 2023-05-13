import React, { useEffect, useState } from 'react';
import styles from '../styles/ComputerCards.module.css';
import Link from 'next/link';
import { getAllComputerParts } from '@/utils/database';

const defaultPart: Part = {
  name: 'Unknown',
  cost: 0,
  image: '',
  type: '',
};


type Part = {
  name: string;
  cost: number;
  image: string;
  type: string;
};

type suggestedBuild = {
  title: string;
  CPU: Part;
  Motherboard: Part;
  Memory: Part;
  Storage: Part;
  Video_Card: Part;
  Case: Part;
  Power_Supply: Part;
  price: string;
};


const ComputerCard: React.FC<suggestedBuild> = (build) => {
  const buildQueryParam = encodeURIComponent(JSON.stringify(build));

  return (
    <Link href={`/addToCart?build=${buildQueryParam}`} passHref>
      <div className={styles.card} role="link" tabIndex={0}>
        <h2>{build.title}</h2>
        <ul>
          <li>{build.CPU.name} ({build.CPU.type}): {build.CPU.cost}</li>
          <li>{build.Motherboard.name} ({build.Motherboard.type}): {build.Motherboard.cost}</li>
          <li>{build.Memory.name} ({build.Memory.type}): {build.Memory.cost}</li>
          <li>{build.Storage.name} ({build.Storage.type}): {build.Storage.cost}</li>
          <li>{build.Video_Card.name} ({build.Video_Card.type}): {build.Video_Card.cost}</li>
          <li>{build.Case.name} ({build.Case.type}): {build.Case.cost}</li>
          <li>{build.Power_Supply.name} ({build.Power_Supply.type}): {build.Power_Supply.cost}</li>
        </ul>
        <p>Price: {build.price}</p>
      </div>
    </Link>
  );
};


const Computers = () => {
  const [allParts, setAllParts] = useState<Part[]>([]);
  
  useEffect(() => {
    let partsPromise = getAllComputerParts();

    partsPromise.then(result => {
      setAllParts(result);
    });
  }, []);

  // Here we select specific parts for each PC. 
  const gamingPC = {
    title: 'Gaming PC',
    CPU: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    Motherboard: allParts.find(part => part.name === 'ASUS ROG Strix B550-F') || defaultPart,
    Memory: allParts.find(part => part.name === 'Crucial Ballistix 32GB') || defaultPart,
    Storage: allParts.find(part => part.name === 'Samsung 980 evo 512GB') || defaultPart,
    Video_Card: allParts.find(part => part.name === 'Nvidia RTX 3070') || defaultPart,
    Case: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    Power_Supply: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    price: '$2000',
  };

  const personalPC = {
    title: 'Personal PC',
    CPU: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    Motherboard: allParts.find(part => part.name === 'ASUS ROG Strix B550-F') || defaultPart,
    Memory: allParts.find(part => part.name === 'Crucial Ballistix 32GB') || defaultPart,
    Storage: allParts.find(part => part.name === 'Samsung 980 evo 512GB') || defaultPart,
    Video_Card: allParts.find(part => part.name === 'Nvidia RTX 3070') || defaultPart,
    Case: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    Power_Supply: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    price: '$2000',
  };

  const businessPC = {
    title: 'Business PC',
    CPU: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    Motherboard: allParts.find(part => part.name === 'ASUS ROG Strix B550-F') || defaultPart,
    Memory: allParts.find(part => part.name === 'Crucial Ballistix 32GB') || defaultPart,
    Storage: allParts.find(part => part.name === 'Samsung 980 evo 512GB') || defaultPart,
    Video_Card: allParts.find(part => part.name === 'Nvidia RTX 3070') || defaultPart,
    Case: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    Power_Supply: allParts.find(part => part.name === 'AMD Ryzen 5') || defaultPart,
    price: '$2000',
  };

  return (
    <div className={styles.container}>
      {allParts.length > 0 ? (
        <>
          <ComputerCard {...gamingPC} />
          <ComputerCard {...personalPC} />
          <ComputerCard {...businessPC} />
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Computers;
