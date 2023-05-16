
import { Inter } from 'next/font/google'
import styles from '@/styles/Home.module.css'
import Footer from './footer'
import Head from 'next/head';
import Navbar from './navbars';
import { ComputerCard, Computers } from './computerCards';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase/config"
import { addUserCompliment, addUserComplaint, getAllComputerParts, getAllComputers, getPartById, getUserComplaints } from "../utils/database"
import { useEffect, useState } from 'react';

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

function makePartFromObject(obj: any) {
  return {
    name: obj.name,
    cost: obj.cost,
    image: obj.image, 
    type: obj.type
  }
}

export default function Home() {
  const [builds, setBuilds] = useState<suggestedBuild[]>([]);
  const [authed, setAuthed] = useState(false);
  async function getPCs() {
    await getAllComputers().then(async res => {
      for (let idx in res) {
        let pc = res[idx];
        await getBuild(pc.cpu, pc.case, pc.gpu, pc.mobo, pc.psu, pc.ram, pc.ssd).then(suggest => {
          suggest.title = "Build " + (parseInt(idx, 10) + 1) ;
          builds.push(suggest)
          setBuilds([...builds]);
        })
      }
    });
// yo
  }

  async function getBuild(
    cpuId: string,
    caseId: string,
    gpuId: string,
    moboId: string,
    psuId: string,
    ramId: string,
    ssdId: string) {
      console.log(cpuId, caseId, gpuId, psuId, ramId, ssdId)
      let cpu = await getPartById(cpuId);
      let gpu = await getPartById(gpuId);
      let case_ = await getPartById(caseId);
      let mobo = await getPartById(moboId);
      let psu = await getPartById(psuId);
      let ram = await getPartById(ramId);
      let ssd = await getPartById(ssdId);
      let cost = parseFloat(cpu?.cost)
                + parseFloat(gpu?.cost) 
                + parseFloat(mobo?.cost) 
                + parseFloat(ram?.cost) 
                + parseFloat(ssd?.cost) 
                + parseFloat(case_?.cost) 
                + parseFloat(psu?.cost);
      let suggestBuild = {
        title: "Build ",
        CPU: makePartFromObject(cpu),
        Motherboard: makePartFromObject(mobo),
        Memory: makePartFromObject(ram),
        Storage: makePartFromObject(ssd),
        Video_Card: makePartFromObject(gpu),
        Case: makePartFromObject(case_),
        Power_Supply: makePartFromObject(psu),
        price: cost.toString(),
      }
      return suggestBuild;
  }

  useEffect(() => {
    getPCs();         
    auth.onAuthStateChanged(() => {
      if(auth.currentUser) setAuthed(true);
    })
  }, []);
  return (
    <>
      <Head>
        <title>MacroCenter</title>
      </Head>


      <div>
        <Navbar />
        <div className={styles.startbuilddiv}>
          <h1 className={styles.buildMachinep}>Build Your Own Machine</h1>
          
          <button className={styles.startbuildbtn}>
            {authed ? <a href='/buildPC'>Start Build</a> : <a href='/signup'>Sign Up</a>}
          </button>

        </div>

        <h1 className={styles.usercardh1}>Employee Made Builds</h1>
        <Computers />
        <h1 className={styles.usercardh1}>User Made Builds</h1>

        <div className={styles.usercardsscroll}>
          <div className={styles.usercards}>
            {builds && builds.map(b => <ComputerCard key={b.title} {...b} />)}
          </div>
        </div>
        
      </div>

      <Footer />
    </>
  )
}
